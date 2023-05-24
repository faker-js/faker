import type {
  Comment,
  DeclarationReflection,
  ParameterReflection,
  Reflection,
  ReflectionType,
  SignatureReflection,
  SomeType,
  Type,
} from 'typedoc';
import { ReflectionFlag, ReflectionKind } from 'typedoc';
import type {
  Method,
  MethodParameter,
} from '../../docs/.vitepress/components/api-docs/method';
import { formatTypescript } from './format';
import { mdToHtml } from './markdown';
import {
  extractDeprecated,
  extractDescription,
  extractRawDefault,
  extractRawExamples,
  extractSeeAlsos,
  extractSince,
  extractSourcePath,
  extractSummaryDefault,
  extractThrows,
  toBlock,
} from './typedoc';

const code = '```';

export function analyzeSignature(
  signature: SignatureReflection,
  accessor: string,
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
      description: mdToHtml(extractDescription(parameter)),
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

  let examples = `${accessor}${methodName}${signatureTypeParametersString}(${signatureParametersString}): ${signature.type?.toString()}\n`;

  const exampleTags = extractRawExamples(signature);
  if (exampleTags.length > 0) {
    examples += `${exampleTags.join('\n').trim()}\n`;
  }

  const seeAlsos = extractSeeAlsos(signature).map((seeAlso) =>
    mdToHtml(seeAlso, true)
  );
  const deprecatedMessage = extractDeprecated(signature);
  const deprecated = deprecatedMessage
    ? mdToHtml(deprecatedMessage)
    : undefined;
  const throwsMessage = extractThrows(signature);
  const throws = throwsMessage ? mdToHtml(throwsMessage, true) : undefined;

  return {
    name: methodName,
    description: mdToHtml(extractDescription(signature)),
    parameters: parameters,
    since: extractSince(signature),
    sourcePath: extractSourcePath(signature),
    throws,
    returns: typeToText(signature.type),
    examples: mdToHtml(`${code}ts\n${examples}${code}`),
    deprecated,
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
  const defaultValue = extractDefaultFromParameter(parameter);

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
      description: mdToHtml(extractDescription(parameter)),
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
  parameterType?: SomeType
): MethodParameter[] {
  if (!parameterType) {
    return [];
  }

  switch (parameterType.type) {
    case 'array':
      return analyzeParameterOptions(`${name}[]`, parameterType.elementType);

    case 'union':
      return parameterType.types.flatMap((type) =>
        analyzeParameterOptions(name, type)
      );

    case 'reflection': {
      const properties = parameterType.declaration.children ?? [];
      return properties.map((property) => {
        const reflection = property.comment
          ? property
          : (property.type as ReflectionType)?.declaration?.signatures?.[0];
        const comment = reflection?.comment;
        const deprecated = extractDeprecated(reflection);
        return {
          name: `${name}.${property.name}${isOptional(property) ? '?' : ''}`,
          type: declarationTypeToText(property),
          default: extractDefaultFromComment(comment),
          description: mdToHtml(
            toBlock(comment) +
              (deprecated ? `\n\n**DEPRECATED:** ${deprecated}` : '')
          ),
        };
      });
    }

    case 'typeOperator':
      return analyzeParameterOptions(name, parameterType.target);

    default:
      return [];
  }
}

function isOptional(parameter: Reflection): boolean {
  return parameter.flags.hasFlag(ReflectionFlag.Optional);
}

function typeToText(type_?: Type, short = false): string {
  if (!type_) {
    return '?';
  }

  const type = type_ as SomeType;
  switch (type.type) {
    case 'array': {
      const text = typeToText(type.elementType, short);
      const isComplexType = text.includes('|') || text.includes('{');
      return isComplexType ? `Array<${text}>` : `${text}[]`;
    }

    case 'union':
      return type.types
        .map((t) => typeToText(t, short))
        .map((t) => (t.includes('=>') ? `(${t})` : t))
        .sort()
        .join(' | ');

    case 'reference':
      if (!type.typeArguments || !type.typeArguments.length) {
        const reflection = type.reflection as DeclarationReflection | undefined;
        const reflectionType = reflection?.type;
        if (
          (reflectionType?.type === 'literal' ||
            reflectionType?.type === 'union') &&
          !/Char$/.test(type.name)
        ) {
          return typeToText(reflectionType, short);
        }

        return type.name;
      } else if (type.name === 'LiteralUnion') {
        return [
          typeToText(type.typeArguments[0], short),
          typeToText(type.typeArguments[1], short),
        ].join(' | ');
      }

      return `${type.name}<${type.typeArguments
        .map((t) => typeToText(t, short))
        .join(', ')}>`;

    case 'reflection':
      return declarationTypeToText(type.declaration, short);

    case 'indexedAccess':
      return `${typeToText(type.objectType, short)}[${typeToText(
        type.indexType,
        short
      )}]`;

    case 'literal':
      return formatTypescript(type.toString()).replace(/;\n$/, '');

    case 'typeOperator': {
      const text = typeToText(type.target, short);
      if (short && type.operator === 'readonly') {
        return text;
      }

      return `${type.operator} ${text}`;
    }

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
      return signatureTypeToText(declaration.signatures?.[0]);

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
      }

      return declaration.toString();

    default:
      return declaration.toString();
  }
}

function signatureTypeToText(signature?: SignatureReflection): string {
  if (!signature) {
    return '(???) => ?';
  }

  return `(${signature.parameters
    ?.map((p) => `${p.name}: ${typeToText(p.type)}`)
    .join(', ')}) => ${typeToText(signature.type)}`;
}

/**
 * Extracts and optionally removes the parameter default from the parameter.
 *
 * @param parameter The parameter to extract the default from.
 * @param eraseDefault Whether to erase the default text from the parameter comment.
 * @returns The extracted default value.
 */
function extractDefaultFromParameter(
  parameter: ParameterReflection,
  eraseDefault = true
): string | undefined {
  const commentDefault = extractDefaultFromComment(
    parameter.comment,
    eraseDefault
  );
  return parameter.defaultValue ?? commentDefault;
}

/**
 * Extracts and optionally removes the parameter default from the comments.
 *
 * @param comment The comment to extract the default from.
 * @param eraseDefault Whether to erase the default text from the comment.
 * @returns The extracted default value.
 */
function extractDefaultFromComment(
  comment?: Comment,
  eraseDefault = true
): string | undefined {
  if (!comment) {
    return;
  }

  const tagDefault = extractRawDefault({ comment });
  const summaryDefault = extractSummaryDefault(comment, eraseDefault);
  return tagDefault || summaryDefault;
}
