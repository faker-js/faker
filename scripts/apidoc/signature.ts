import sanitizeHtml from 'sanitize-html';
import type {
  Comment,
  DeclarationReflection,
  ParameterReflection,
  Reflection,
  SignatureReflection,
  SomeType,
  Type,
} from 'typedoc';
import { ReflectionFlag, ReflectionKind } from 'typedoc';
import { createMarkdownRenderer } from 'vitepress';
import type {
  Method,
  MethodParameter,
} from '../../docs/.vitepress/components/api-docs/method';
import vitepressConfig from '../../docs/.vitepress/config';
import { faker } from '../../src';
import { formatTypescript, pathOutputDir } from './utils';

export function prettifyMethodName(method: string): string {
  return (
    // Capitalize and insert space before upper case characters
    method.substring(0, 1).toUpperCase() +
    method.substring(1).replace(/([A-Z]+)/g, ' $1')
  );
}

export function toBlock(comment?: Comment): string {
  return (
    (comment?.shortText.trim() || 'Missing') +
    (comment?.text ? `\n\n${comment.text}` : '')
  );
}

const markdown = createMarkdownRenderer(
  pathOutputDir,
  vitepressConfig.markdown,
  '/'
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
  signature: SignatureReflection,
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
      name: `<${parameter.name}>`,
      type: parameter.type ? typeToText(parameter.type) : undefined,
      description: mdToHtml(toBlock(parameter.comment)),
    });
  }

  // Collect Parameters
  const signatureParameters: string[] = [];
  for (
    let index = 0;
    signature.parameters && index < signature.parameters.length;
    index++
  ) {
    const parameter = signature.parameters[index];

    const aParam = analyzeParameter(parameter);
    signatureParameters.push(aParam.signature);
    parameters.push(...aParam.parameters);
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
  if (moduleName) {
    try {
      let example = JSON.stringify(faker[moduleName][methodName]());
      if (example.length > 50) {
        example = `${example.substring(0, 47)}...`;
      }

      examples += `faker.${moduleName}.${methodName}()`;
      examples += `${example ? ` // => ${example}` : ''}\n`;
    } catch (error) {
      // Ignore the error => hide the example call + result.
    }
  }
  const exampleTags =
    signature?.comment?.tags
      .filter((tag) => tag.tagName === 'example')
      .map((tag) => tag.text.trimEnd()) || [];

  if (exampleTags.length > 0) {
    examples += `${exampleTags.join('\n').trim()}\n`;
  }

  const seeAlsos =
    signature.comment?.tags
      .filter((t) => t.tagName === 'see')
      .map((t) => t.text.trim()) ?? [];

  const prettyMethodName = prettifyMethodName(methodName);
  const code = '```';

  return {
    name: methodName,
    title: prettyMethodName,
    description: mdToHtml(toBlock(signature.comment)),
    parameters: parameters,
    returns: typeToText(signature.type),
    examples: mdToHtml(`${code}ts\n${examples}${code}`),
    deprecated: signature.comment?.hasTag('deprecated') ?? false,
    seeAlsos,
  };
}

function analyzeParameter(parameter: ParameterReflection): {
  parameters: MethodParameter[];
  signature: string;
} {
  const name = parameter.name;
  const declarationName = name + (isOptional(parameter) ? '?' : '');
  const type = parameter.type;
  const commentDefault = extractDefaultFromComment(parameter.comment);
  const defaultValue = parameter.defaultValue ?? commentDefault;

  let signatureText = '';
  if (defaultValue) {
    signatureText = ` = ${defaultValue}`;
  }

  const signature = `${declarationName}: ${typeToText(type)}${signatureText}`;

  const parameters: MethodParameter[] = [
    {
      name: declarationName,
      type: typeToText(type, true),
      default: defaultValue,
      description: mdToHtml(toBlock(parameter.comment)),
    },
  ];
  parameters.push(...analyzeParameterOptions(name, type));

  return {
    parameters,
    signature,
  };
}

function analyzeParameterOptions(
  name: string,
  parameterType: SomeType
): MethodParameter[] {
  if (parameterType.type === 'union') {
    return parameterType.types.flatMap((type) =>
      analyzeParameterOptions(name, type)
    );
  } else if (parameterType.type === 'reflection') {
    const properties = parameterType.declaration.children ?? [];
    return properties.map((property) => ({
      name: `${name}.${property.name}${isOptional(property) ? '?' : ''}`,
      type: declarationTypeToText(property),
      default: extractDefaultFromComment(property.comment),
      description: mdToHtml(
        toBlock(property.comment ?? property.signatures?.[0].comment)
      ),
    }));
  }

  return [];
}

function isOptional(parameter: Reflection): boolean {
  return parameter.flags.hasFlag(ReflectionFlag.Optional);
}

function typeToText(type_: Type, short = false): string {
  const type = type_ as SomeType;
  switch (type.type) {
    case 'array':
      return `${typeToText(type.elementType, short)}[]`;
    case 'union':
      return type.types
        .map((t) => typeToText(t, short))
        .sort()
        .join(' | ');
    case 'reference':
      if (!type.typeArguments || !type.typeArguments.length) {
        return type.name;
      } else if (type.name === 'LiteralUnion') {
        return [
          typeToText(type.typeArguments[0]),
          typeToText(type.typeArguments[1]),
        ].join(' | ');
      } else {
        return `${type.name}<${type.typeArguments
          .map((t) => typeToText(t, short))
          .join(', ')}>`;
      }
    case 'reflection':
      return declarationTypeToText(type.declaration, short);
    case 'indexedAccess':
      return `${typeToText(type.objectType, short)}[${typeToText(
        type.indexType,
        short
      )}]`;
    case 'literal':
      return formatTypescript(type.toString()).replace(/;\n$/, '');
    default:
      return type.toString();
  }
}

function declarationTypeToText(
  declaration: DeclarationReflection,
  short = false
): string {
  switch (declaration.kind) {
    case ReflectionKind.Method:
      return signatureTypeToText(declaration.signatures[0]);

    case ReflectionKind.Property:
      return typeToText(declaration.type);

    case ReflectionKind.TypeLiteral:
      if (declaration.children?.length) {
        if (short) {
          // This is too long for the parameter table, thus we abbreviate this.
          return '{ ... }';
        }

        const list = declaration.children
          .map((c) => `  ${c.name}: ${declarationTypeToText(c)}`)
          .join(',\n');

        return `{\n${list}\n}`;
      } else if (declaration.signatures?.length) {
        return signatureTypeToText(declaration.signatures[0]);
      } else {
        return declaration.toString();
      }

    default:
      return declaration.toString();
  }
}

function signatureTypeToText(signature: SignatureReflection): string {
  return `(${signature.parameters
    .map((p) => `${p.name}: ${typeToText(p.type)}`)
    .join(', ')}) => ${typeToText(signature.type)}`;
}

/**
 * Extracts and removed the parameter default from the comments.
 *
 * @param comment The comment to extract the default from.
 * @returns The extracted default value.
 */
function extractDefaultFromComment(comment?: Comment): string {
  if (!comment) {
    return;
  }
  const text = comment.shortText?.trim();
  if (!text) {
    return;
  }
  const result = /^(.*)[ \n]Defaults to `([^`]+)`\.(.*)$/s.exec(text);
  if (!result) {
    return;
  }
  if (result[3].trim()) {
    throw new Error(`Found description text after the default value:\n${text}`);
  }
  comment.shortText = result[1];
  return result[2];
}
