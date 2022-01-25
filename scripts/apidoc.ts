import * as TypeDoc from 'typedoc';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import options from '../.prettierrc.cjs';
import faker from '../src';

const pathRoot = resolve(__dirname, '..');
const pathDocsDir = resolve(pathRoot, 'docs');
const pathDocsApiPages = resolve(pathDocsDir, '.vitepress', 'api-pages.mjs');
const pathOutputDir = resolve(pathDocsDir, 'api');
const pathOutputJson = resolve(pathOutputDir, 'typedoc.json');

function toBlock(comment?: TypeDoc.Comment): string {
  return (
    (comment?.shortText.trim() || 'Missing') +
    (comment?.text ? '\n\n' + comment.text : '')
  );
}

function escape(value: string): string {
  return value.replace(/\|/, '\\|').replace(/</, '\\<').replace(/>/, '\\>');
}

function parameterRow(
  name: string,
  type?: string,
  def?: string,
  comment?: TypeDoc.Comment
): string {
  def = def ? `\`${def}\`` : '';
  return (
    '| ' +
    escape(name) +
    ' | ' +
    escape(type) +
    ' | ' +
    def +
    ' | ' +
    escape(toBlock(comment))
      .replace(/\n{2,}/, '<br />')
      .replace(/\n/, '') +
    '|\n'
  );
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
  modulesPages.push({ text: 'Faker', link: '/api/faker' });
  modulesPages.push({ text: 'Localization', link: '/api/localization' });

  // Generate module file
  for (const module of modules) {
    const moduleName = module.name.replace('_', '');
    const lowerModuleName =
      moduleName.substring(0, 1).toLowerCase() + moduleName.substring(1);
    console.log(`Processing Module ${moduleName}`);

    modulesPages.push({ text: moduleName, link: '/api/' + lowerModuleName });

    let content = `
      # ${moduleName}

      <!-- This file is automatically generated. -->
      <!-- Run 'pnpm run docs:api' to update -->

      [[toc]]

      ::: v-pre

      ${toBlock(module.comment)}

      `.replace(/\n +/g, '\n');

    const methods = module.getChildrenByKind(TypeDoc.ReflectionKind.Method);

    // Generate method section
    for (let method of methods) {
      const methodName = method.name;
      const prettyMethodName =
        methodName.substring(0, 1).toUpperCase() +
        methodName.substring(1).replace(/([A-Z]+)/g, ' $1');
      console.log(`- method ${prettyMethodName}`);
      const signature = method.signatures[0];

      content += `
        ## ${prettyMethodName}

        ${toBlock(signature.comment)}

        `.replace(/\n +/g, '\n');

      // Generate parameter section
      const typeParameters = signature.typeParameters || [];
      const parameters = signature.parameters || [];
      const signatureTypeParameters: string[] = [];
      const signatureParameters: string[] = [];
      let requiresArgs = false;
      if (typeParameters.length !== 0 || parameters.length !== 0) {
        content += `**Parameters**\n\n`;

        content += '| Name | Type | Default | Description |\n';
        content += '| ---- | ---- | ------- | ----------- |\n';

        // typeParameters
        typeParameters.forEach((parameter, index) => {
          const parameterName = parameter.name;

          signatureTypeParameters.push(parameterName);
          content += parameterRow(
            `<${parameterName}>`,
            '',
            '',
            parameter.comment
          );
        });

        // parameters
        parameters.forEach((parameter, index) => {
          const parameterDefault = parameter.defaultValue;
          const parameterRequired = typeof parameterDefault === 'undefined';
          if (index == 0) {
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
          content += parameterRow(
            parameterName,
            parameterType,
            parameterDefault,
            parameter.comment
          );
        });
        content += '\n\n';
      }
      content += '**Returns:** ' + signature.type.toString() + '\n\n';

      // Generate usage section

      content += '````ts\n';

      let signatureTypeParametersString = signatureTypeParameters.join(', ');
      if (signatureTypeParametersString.length !== 0) {
        signatureTypeParametersString = `<${signatureTypeParametersString}>`;
      }
      const signatureParametersString = signatureParameters.join(', ');

      content += `faker.${lowerModuleName}.${methodName}${signatureTypeParametersString}(${signatureParametersString}): ${signature.type.toString()}\n`;
      faker.seed(0);
      if (!requiresArgs) {
        try {
          let example = JSON.stringify(faker[lowerModuleName][methodName]());
          if (example.length > 50) {
            example = example.substring(0, 47) + '...';
          }

          content += `faker.${lowerModuleName}.${methodName}()`;
          content += (example ? ` // => ${example}` : '') + '\n';
        } catch {
          console.log(
            `Failed to call: faker.${lowerModuleName}${methodName}()`
          );
        }
      }
      let examples =
        signature?.comment?.tags
          .filter((tag) => tag.tagName === 'example')
          .map((tag) => tag.text.trimEnd()) || [];

      if (examples.length !== 0) {
        console.log('Example-Length: ' + examples);
        content += examples.join('\n') + '\n';
      }

      content += '````\n\n';
    }

    // Format md

    content = format(content, {
      ...options,
      parser: 'markdown',
    });

    // Write to disk

    writeFileSync(resolve(pathOutputDir, lowerModuleName + '.md'), content);
    console.log(`Done Module ${moduleName}`);
  }

  // Write api-pages.mjs
  modulesPages.sort((a, b) => a.text.localeCompare(b.text));
  let apiPagesContent = `
    // This file is automatically generated.
    // Run 'pnpm run docs:api' to update
    export const apiPages = ${JSON.stringify(modulesPages)};
    `.replace(/\n +/, '\n');

  apiPagesContent = format(apiPagesContent, {
    ...options,
    parser: 'babel',
  });

  writeFileSync(pathDocsApiPages, apiPagesContent);
  console.log('Updated api-pages.mjs');
}

build().catch(console.error);
