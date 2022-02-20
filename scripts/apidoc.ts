import { writeFileSync } from 'fs';
import { resolve } from 'path';
import type { Options } from 'prettier';
import { format } from 'prettier';
import * as TypeDoc from 'typedoc';
import { createMarkdownRenderer } from 'vitepress';
import prettierConfig from '../.prettierrc.cjs';
import type {
  Method,
  MethodParameter,
} from '../docs/.vitepress/components/api-docs/method';
// import vitepressConfig from '../docs/.vitepress/config';
import faker from '../src';
import sanitizeHtml from 'sanitize-html';

const pathRoot = resolve(__dirname, '..');
const pathDocsDir = resolve(pathRoot, 'docs');
const pathDocsApiPages = resolve(pathDocsDir, '.vitepress', 'api-pages.mjs');
const pathOutputDir = resolve(pathDocsDir, 'api');
const pathOutputJson = resolve(pathOutputDir, 'typedoc.json');

const scriptCommand = 'pnpm run generate:api-docs';

const markdown = createMarkdownRenderer(
  pathOutputDir
  // vitepressConfig.markdown
);

const prettierMarkdown: Options = {
  ...prettierConfig,
  parser: 'markdown',
};

const prettierTypescript: Options = {
  ...prettierConfig,
  parser: 'typescript',
};

const prettierBabel: Options = {
  ...prettierConfig,
  parser: 'babel',
};

const htmlSanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: ['a', 'code', 'div', 'li', 'span', 'p', 'pre', 'ul'],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    div: ['class'],
    pre: ['v-pre'],
    span: ['class'],
  },
  selfClosing: [],
};

function toBlock(comment?: TypeDoc.Comment): string {
  return (
    (comment?.shortText.trim() || 'Missing') +
    (comment?.text ? '\n\n' + comment.text : '')
  );
}

function mdToHtml(md: string): string {
  const rawHtml = markdown.render(md);
  const safeHtml: string = sanitizeHtml(rawHtml, htmlSanitizeOptions);
  if (rawHtml.replaceAll('&gt;', '>') === safeHtml.replaceAll('&gt;', '>')) {
    return safeHtml;
  } else {
    console.debug('Rejected unsafe md:', md);
    console.error('Rejected unsafe html:', rawHtml.replaceAll('&gt;', '>'));
    console.error('Expected safe html:', safeHtml.replaceAll('&gt;', '>'));
    throw new Error('Found unsafe html');
  }
}

async function build(): Promise<void> {
  const app = new TypeDoc.Application();

  app.options.addReader(new TypeDoc.TSConfigReader());
  // If you want TypeDoc to load typedoc.json files
  //app.options.addReader(new TypeDoc.TypeDocReader());

  app.bootstrap({
    entryPoints: ['src/index.ts'],
    pretty: true,
    cleanOutputDir: true,
  });

  const project = app.convert();

  if (!project) {
    // Project may not have converted correctly
    return;
  }
  // Useful for analyzing the content
  await app.generateJson(project, pathOutputJson);

  const modules = project
    .getChildrenByKind(TypeDoc.ReflectionKind.Namespace)[0]
    .getChildrenByKind(TypeDoc.ReflectionKind.Class);

  const modulesPages: Array<{ text: string; link: string }> = [];
  modulesPages.push({ text: 'Fake', link: '/api/fake.html' });
  modulesPages.push({ text: 'Localization', link: '/api/localization.html' });

  // Generate module file
  for (const module of modules) {
    const moduleName = module.name.replace('_', '');
    const lowerModuleName =
      moduleName.substring(0, 1).toLowerCase() + moduleName.substring(1);
    if (faker[lowerModuleName] === undefined) {
      continue;
    }
    console.log(`Processing Module ${moduleName}`);

    modulesPages.push({
      text: moduleName,
      link: `/api/${lowerModuleName}.html`,
    });

    const methods: Method[] = [];

    // Generate method section
    for (const method of module.getChildrenByKind(
      TypeDoc.ReflectionKind.Method
    )) {
      const methodName = method.name;
      const prettyMethodName =
        methodName.substring(0, 1).toUpperCase() +
        methodName.substring(1).replace(/([A-Z]+)/g, ' $1');
      console.debug(`- method ${prettyMethodName}`);
      const signature = method.signatures[0];

      const parameters: MethodParameter[] = [];

      // typeParameters
      const typeParameters = signature.typeParameters || [];
      const signatureTypeParameters: string[] = [];
      for (const parameter of typeParameters) {
        signatureTypeParameters.push(parameter.name);
        parameters.push({
          name: parameter.name,
          description: mdToHtml(toBlock(parameter.comment)),
        });
      }

      // parameters
      const signatureParameters: string[] = [];
      let requiresArgs = false;
      for (
        let index = 0;
        signature.parameters && index < signature.parameters.length;
        index++
      ) {
        const parameter = signature.parameters[index];

        const parameterDefault = parameter.defaultValue;
        const parameterRequired = typeof parameterDefault === 'undefined';
        if (index === 0) {
          requiresArgs = parameterRequired;
        }
        const parameterName = parameter.name + (parameterRequired ? '?' : '');
        const parameterType = parameter.type.toString();

        let parameterDefaultSignatureText = '';
        if (!parameterRequired) {
          parameterDefaultSignatureText = ' = ' + parameterDefault;
        }

        signatureParameters.push(
          parameterName + ': ' + parameterType + parameterDefaultSignatureText
        );
        parameters.push({
          name: parameter.name,
          type: parameterType,
          default: parameterDefault,
          description: mdToHtml(toBlock(parameter.comment)),
        });
      }

      // Generate usage section

      let signatureTypeParametersString = '';
      if (signatureTypeParameters.length !== 0) {
        signatureTypeParametersString = `<${signatureTypeParameters.join(
          ', '
        )}>`;
      }
      const signatureParametersString = signatureParameters.join(', ');

      let examples = `faker.${lowerModuleName}.${methodName}${signatureTypeParametersString}(${signatureParametersString}): ${signature.type.toString()}\n`;
      faker.seed(0);
      if (!requiresArgs) {
        try {
          let example = JSON.stringify(faker[lowerModuleName][methodName]());
          if (example.length > 50) {
            example = example.substring(0, 47) + '...';
          }

          examples += `faker.${lowerModuleName}.${methodName}()`;
          examples += (example ? ` // => ${example}` : '') + '\n';
        } catch (error) {
          // Ignore the error => hide the example call + result.
        }
      }
      const exampleTags =
        signature?.comment?.tags
          .filter((tag) => tag.tagName === 'example')
          .map((tag) => tag.text.trimEnd()) || [];

      if (exampleTags.length !== 0) {
        examples += exampleTags.join('\n').trim() + '\n';
      }

      methods.push({
        name: prettyMethodName,
        description: mdToHtml(toBlock(signature.comment)),
        parameters: parameters,
        returns: signature.type.toString(),
        examples: mdToHtml('```ts\n' + examples + '```'),
      });
    }

    // Write api docs page
    let content = `
      <script setup>
      import ApiDocsMethod from '../.vitepress/components/api-docs/method.vue'
      import { ${lowerModuleName} } from './${lowerModuleName}'
      import { ref } from 'vue';

      const methods = ref(${lowerModuleName});
      </script>

      # ${moduleName}

      <!-- This file is automatically generated. -->
      <!-- Run '${scriptCommand}' to update -->

      ::: v-pre

      ${toBlock(module.comment)}

      :::

      <ApiDocsMethod v-for="method of methods" v-bind:key="method.name" :method="method" v-once />
      `.replace(/\n +/g, '\n');

    content = format(content, prettierMarkdown);

    writeFileSync(resolve(pathOutputDir, lowerModuleName + '.md'), content);

    // Write api docs data

    let contentTs = `
    import type { Method } from '../.vitepress/components/api-docs/method';

    export const ${lowerModuleName}: Method[] = ${JSON.stringify(
      methods,
      null,
      2
    )}`;

    contentTs = format(contentTs, prettierTypescript);

    writeFileSync(resolve(pathOutputDir, lowerModuleName + '.ts'), contentTs);
  }

  // Write api-pages.mjs
  console.log('Updating api-pages.mjs');
  modulesPages.sort((a, b) => a.text.localeCompare(b.text));
  let apiPagesContent = `
    // This file is automatically generated.
    // Run '${scriptCommand}' to update
    export const apiPages = ${JSON.stringify(modulesPages)};
    `.replace(/\n +/, '\n');

  apiPagesContent = format(apiPagesContent, prettierBabel);

  writeFileSync(pathDocsApiPages, apiPagesContent);
}

build().catch(console.error);
