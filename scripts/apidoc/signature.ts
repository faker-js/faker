import sanitizeHtml from 'sanitize-html';
import type * as TypeDoc from 'typedoc';
import { createMarkdownRenderer } from 'vitepress';
import type {
  Method,
  MethodParameter,
} from '../../docs/.vitepress/components/api-docs/method';
import faker from '../../src';
import { pathOutputDir } from './utils';
// TODO ST-DDT 2022-02-20: Actually import this/fix module import errors
// import vitepressConfig from '../../docs/.vitepress/config';

export function prettifyMethodName(method: string): string {
  return (
    // Capitalize and insert space before upper case characters
    method.substring(0, 1).toUpperCase() +
    method.substring(1).replace(/([A-Z]+)/g, ' $1')
  );
}

export function toBlock(comment?: TypeDoc.Comment): string {
  return (
    (comment?.shortText.trim() || 'Missing') +
    (comment?.text ? '\n\n' + comment.text : '')
  );
}

const markdown = createMarkdownRenderer(
  pathOutputDir
  // TODO ST-DDT 2022-02-20: Actually import this/fix module import errors
  // vitepressConfig.markdown
);

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

function mdToHtml(md: string): string {
  const rawHtml = markdown.render(md);
  const safeHtml: string = sanitizeHtml(rawHtml, htmlSanitizeOptions);
  // Revert some escaped characters for comparison.
  if (rawHtml.replace(/&gt;/g, '>') === safeHtml.replace(/&gt;/g, '>')) {
    return safeHtml;
  } else {
    console.debug('Rejected unsafe md:', md);
    console.error('Rejected unsafe html:', rawHtml.replace(/&gt;/g, '>'));
    console.error('Expected safe html:', safeHtml.replace(/&gt;/g, '>'));
    throw new Error('Found unsafe html');
  }
}

export function analyzeSignature(
  signature: TypeDoc.SignatureReflection,
  moduleName: string,
  methodName: string
): Method {
  const parameters: MethodParameter[] = [];

  // Collect Type Parameters
  const typeParameters = signature.typeParameters || [];
  const signatureTypeParameters: string[] = [];
  for (const parameter of typeParameters) {
    signatureTypeParameters.push(parameter.name);
    parameters.push({
      name: parameter.name,
      description: mdToHtml(toBlock(parameter.comment)),
    });
  }

  // Collect Parameters
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
    signatureTypeParametersString = `<${signatureTypeParameters.join(', ')}>`;
  }
  const signatureParametersString = signatureParameters.join(', ');

  let examples: string;
  if (moduleName) {
    examples = `faker.${moduleName}.${methodName}${signatureTypeParametersString}(${signatureParametersString}): ${signature.type.toString()}\n`;
  } else {
    examples = `faker.${methodName}${signatureTypeParametersString}(${signatureParametersString}): ${signature.type.toString()}\n`;
  }
  faker.seed(0);
  if (!requiresArgs && moduleName) {
    try {
      let example = JSON.stringify(faker[moduleName][methodName]());
      if (example.length > 50) {
        example = example.substring(0, 47) + '...';
      }

      examples += `faker.${moduleName}.${methodName}()`;
      examples += (example ? ` // => ${example}` : '') + '\n';
    } catch (error) {
      // Ignore the error => hide the example call + result.
    }
  }
  const exampleTags =
    signature?.comment?.tags
      .filter((tag) => tag.tagName === 'example')
      .map((tag) => tag.text.trimEnd()) || [];

  if (exampleTags.length > 0) {
    examples += exampleTags.join('\n').trim() + '\n';
  }

  const seeAlsos =
    signature.comment?.tags
      .filter((t) => t.tagName === 'see')
      .map((t) => t.text.trim()) ?? [];

  const prettyMethodName = prettifyMethodName(methodName);
  return {
    name: methodName,
    title: prettyMethodName,
    description: mdToHtml(toBlock(signature.comment)),
    parameters: parameters,
    returns: signature.type.toString(),
    examples: mdToHtml('```ts\n' + examples + '```'),
    deprecated: signature.comment?.hasTag('deprecated') ?? false,
    seeAlsos,
  };
}
