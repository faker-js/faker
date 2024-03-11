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
import { codeToHtml, mdToHtml } from './markdown';
import {
  extractDeprecated,
  extractDescription,
  extractJoinedRawExamples,
  extractRawDefault,
  extractSeeAlsos,
  extractSince,
  extractSourcePath,
  extractSummaryDefault,
  extractThrows,
  toBlock,
} from './typedoc';

export async function analyzeSignature(
  signature: SignatureReflection,
  accessor: string,
  methodName: string
): Promise<Method> {
  const parameters: MethodParameter[] = [];

  // Collect Type Parameters
  const typeParameters = signature.typeParameters || [];
  const signatureTypeParameters: string[] = [];
  for (const parameter of typeParameters) {
    signatureTypeParameters.push(parameter.name);
    parameters.push({
      name: `<${parameter.name}>`,
      type: parameter.type ? await typeToText(parameter.type) : undefined,
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

    const aParam = await analyzeParameter(parameter);
    signatureParameters.push(aParam.signature);
    parameters.push(...aParam.parameters);
  }

  // Generate usage section

  let signatureTypeParametersString = '';
  if (signatureTypeParameters.length > 0) {
    signatureTypeParametersString = `<${signatureTypeParameters.join(', ')}>`;
  }

  const signatureParametersString = signatureParameters.join(', ');

  let examples = `${accessor}${methodName}${signatureTypeParametersString}(${signatureParametersString}): ${signature.type?.toString()}\n`;

  const exampleTags = extractJoinedRawExamples(signature);
  if (exampleTags) {
    examples += exampleTags;
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
    returns: await typeToText(signature.type),
    examples: codeToHtml(examples),
    deprecated,
    seeAlsos,
  };
}

async function analyzeParameter(parameter: ParameterReflection): Promise<{
  parameters: MethodParameter[];
  signature: string;
}> {
  const name = parameter.name;
  const declarationName = name + (isOptional(parameter) ? '?' : '');
  const type = parameter.type;
  const defaultValue = extractDefaultFromParameter(parameter);

  let signatureText = '';
  if (defaultValue) {
    signatureText = ` = ${defaultValue}`;
  }

  const signature = `${declarationName}: ${await typeToText(
    type
  )}${signatureText}`;

  const parameters: MethodParameter[] = [
    {
      name: declarationName,
      type: await typeToText(type, true),
      default: defaultValue,
      description: mdToHtml(extractDescription(parameter)),
    },
  ];
  parameters.push(...(await analyzeParameterOptions(name, type)));

  return {
    parameters,
    signature,
  };
}

// keep in sync with assertNestedParameterDefault
async function analyzeParameterOptions(
  name: string,
  parameterType?: SomeType
): Promise<MethodParameter[]> {
  if (!parameterType) {
    return [];
  }

  switch (parameterType.type) {
    case 'array': {
      return analyzeParameterOptions(`${name}[]`, parameterType.elementType);
    }

    case 'union': {
      return Promise.all(
        parameterType.types.map((type) => analyzeParameterOptions(name, type))
      ).then((options) => options.flat());
    }

    case 'reflection': {
      const properties = parameterType.declaration.children ?? [];
      return Promise.all(
        properties.map(async (property) => {
          const reflection = property.comment
            ? property
            : (property.type as ReflectionType)?.declaration?.signatures?.[0];
          const comment = reflection?.comment;
          const deprecated = extractDeprecated(reflection);
          return {
            name: `${name}.${property.name}${isOptional(property) ? '?' : ''}`,
            type: await declarationTypeToText(property),
            default: extractDefaultFromComment(comment),
            description: mdToHtml(
              toBlock(comment) +
                (deprecated ? `\n\n**DEPRECATED:** ${deprecated}` : '')
            ),
          };
        })
      );
    }

    case 'typeOperator': {
      return analyzeParameterOptions(name, parameterType.target);
    }

    default: {
      return [];
    }
  }
}

function isOptional(parameter: Reflection): boolean {
  return parameter.flags.hasFlag(ReflectionFlag.Optional);
}

async function typeToText(type_?: Type, short = false): Promise<string> {
  if (!type_) {
    return '?';
  }

  const type = type_ as SomeType;
  switch (type.type) {
    case 'array': {
      const text = await typeToText(type.elementType, short);
      const isComplexType = text.includes('|') || text.includes('{');
      return isComplexType ? `Array<${text}>` : `${text}[]`;
    }

    case 'union': {
      return (await Promise.all(type.types.map((t) => typeToText(t, short))))
        .map((t) => (t.includes('=>') ? `(${t})` : t))
        .sort()
        .join(' | ');
    }

    case 'reference': {
      if (!type.typeArguments || type.typeArguments.length === 0) {
        const reflection = type.reflection as DeclarationReflection | undefined;
        const reflectionType = reflection?.type;
        if (
          (reflectionType?.type === 'literal' ||
            reflectionType?.type === 'union') &&
          !type.name.endsWith('Char')
        ) {
          return typeToText(reflectionType, short);
        }

        return type.name;
      } else if (type.name === 'LiteralUnion') {
        return [
          await typeToText(type.typeArguments[0], short),
          await typeToText(type.typeArguments[1], short),
        ].join(' | ');
      }

      return `${type.name}<${(
        await Promise.all(type.typeArguments.map((t) => typeToText(t, short)))
      ).join(', ')}>`;
    }

    case 'reflection': {
      return declarationTypeToText(type.declaration, short);
    }

    case 'indexedAccess': {
      return `${await typeToText(type.objectType, short)}[${await typeToText(
        type.indexType,
        short
      )}]`;
    }

    case 'literal': {
      return (await formatTypescript(type.toString())).replace(/;\n$/, '');
    }

    case 'typeOperator': {
      const text = await typeToText(type.target, short);
      if (short && type.operator === 'readonly') {
        return text;
      }

      return `${type.operator} ${text}`;
    }

    default: {
      return type.toString();
    }
  }
}

async function declarationTypeToText(
  declaration: DeclarationReflection,
  short = false
): Promise<string> {
  switch (declaration.kind) {
    case ReflectionKind.Method: {
      return signatureTypeToText(declaration.signatures?.[0]);
    }

    case ReflectionKind.Property: {
      return typeToText(declaration.type);
    }

    case ReflectionKind.TypeLiteral: {
      if (declaration.children?.length) {
        if (short) {
          // This is too long for the parameter table, thus we abbreviate this.
          return '{ ... }';
        }

        const list = (
          await Promise.all(
            declaration.children.map(
              async (c) => `  ${c.name}: ${await declarationTypeToText(c)}`
            )
          )
        ).join(',\n');

        return `{\n${list}\n}`;
      } else if (declaration.signatures?.length) {
        return signatureTypeToText(declaration.signatures[0]);
      }

      return declaration.toString();
    }

    default: {
      return declaration.toString();
    }
  }
}

async function signatureTypeToText(
  signature?: SignatureReflection
): Promise<string> {
  if (!signature) {
    return '(???) => ?';
  }

  return `(${(
    await Promise.all(
      signature.parameters?.map(
        async (p) => `${p.name}: ${await typeToText(p.type)}`
      ) ?? []
    )
  ).join(', ')}) => ${await typeToText(signature.type)}`;
}

/**
 * Extracts and optionally removes the parameter default from the parameter.
 *
 * @param parameter The parameter to extract the default from.
 * @param eraseDefault Whether to erase the default text from the parameter comment.
 *
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
 *
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
