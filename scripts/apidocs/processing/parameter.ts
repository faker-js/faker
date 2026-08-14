import type {
  JSDoc,
  JSDocTag,
  ParameterDeclaration,
  PropertySignature,
  Symbol,
  Type,
  TypeParameterDeclaration,
} from 'ts-morph';
import { exactlyOne, valueForKey } from '../utils/value-checks';
import { newProcessingError } from './error';
import {
  extractSummaryDefault,
  getDefault,
  getDeprecated,
  getDescription,
  getJsDocs,
  getParameterTags,
  getTypeParameterTags,
  stripSummaryDefault,
} from './jsdocs';
import type { RawApiDocsType } from './type';
import {
  attachShadowTypeDescriptions,
  getNameSuffix,
  getShadowTypeDescriptions,
  getTypeText,
  isOptionsLikeType,
  isRangeType,
} from './type';

/**
 * Represents a parameter in the raw API docs.
 */
export interface RawApiDocsParameter {
  /**
   * The name of the parameter.
   */
  name: string;
  /**
   * The type of the parameter.
   */
  type: RawApiDocsType;
  /**
   * The default value or expression of the parameter, if it has one.
   */
  default: string | undefined;
  /**
   * The description of the parameter.
   */
  description: string;
}

export function processTypeParameters(
  parameters: TypeParameterDeclaration[],
  jsdocs: JSDoc
): RawApiDocsParameter[] {
  const paramTags = getTypeParameterTags(jsdocs);

  return parameters.flatMap((parameter) => {
    try {
      return processTypeParameterEntry(parameter, paramTags);
    } catch (error) {
      throw newProcessingError({
        type: 'type parameter',
        name: parameter.getName(),
        source: parameter,
        cause: error,
      });
    }
  });
}

function processTypeParameterEntry(
  parameter: TypeParameterDeclaration,
  paramTags: Record<string, JSDocTag>
): RawApiDocsParameter {
  return {
    name: `<${parameter.getName()}>`,
    type: getTypeText(parameter.getType(), { resolveAliases: true }),
    default: parameter.getDefault()?.getText(),
    description: getDescription(valueForKey(paramTags, parameter.getName())),
  };
}

export function processParameters(
  signatureParameters: ParameterDeclaration[],
  implParameters: ParameterDeclaration[],
  jsdocs: JSDoc
): RawApiDocsParameter[] {
  const paramTags = getParameterTags(jsdocs);
  const implParameterDefaults = Object.fromEntries(
    implParameters.map((parameter) => [
      parameter.getName(),
      getDefaultValue(parameter),
    ])
  );

  return signatureParameters.flatMap((parameter) => {
    try {
      return processParameter(
        parameter,
        paramTags,
        implParameterDefaults[parameter.getName()]
      );
    } catch (error) {
      throw newProcessingError({
        type: 'parameter',
        name: parameter.getName(),
        source: parameter,
        cause: error,
      });
    }
  });
}

function processParameter(
  parameter: ParameterDeclaration,
  paramTags: Record<string, JSDocTag>,
  implementationDefault: string | undefined
): RawApiDocsParameter[] {
  const name = parameter.getName();
  return [
    processSimpleParameter(
      parameter,
      valueForKey(paramTags, name),
      implementationDefault
    ),
    ...processComplexParameter(name, parameter.getType(), paramTags),
  ];
}

type ParameterLikeDeclaration = Pick<
  ParameterDeclaration,
  'getName' | 'getType'
> &
  Partial<Pick<ParameterDeclaration, 'getInitializer' | 'getTypeNode'>>;

function processSimpleParameter(
  parameter: ParameterLikeDeclaration,
  jsdocTag: JSDocTag,
  implementationDefault: string | undefined
): RawApiDocsParameter {
  const name = parameter.getName();
  const type = parameter.getType();
  const description = getDescription(jsdocTag);
  const signatureDefault = getDefaultValue(parameter) ?? implementationDefault;
  const summaryDefault = extractSummaryDefault(description);
  if (
    signatureDefault != null &&
    summaryDefault != null &&
    signatureDefault !== summaryDefault
  ) {
    throw new Error(
      `The documented default \`${summaryDefault}\` does not match the implementation default \`${signatureDefault}\``
    );
  }

  return {
    name: `${name}${getNameSuffix(type)}`,
    type: attachShadowTypeDescriptions(
      getTypeText(type, {
        abbreviate: true,
        stripUndefined: true,
      }),
      getShadowTypeDescriptions(parameter.getTypeNode?.())
    ),
    default: signatureDefault ?? summaryDefault,
    description: stripSummaryDefault(description),
  };
}

function getDefaultValue(
  parameter: ParameterLikeDeclaration
): string | undefined {
  return parameter
    .getInitializer?.()
    ?.getText()
    .replace(/ as .+$/, '');
}

function processComplexParameter(
  name: string,
  type: Type,
  paramTags: Record<string, JSDocTag>
): RawApiDocsParameter[] {
  if (type.isNullable()) {
    return processComplexParameter(name, type.getNonNullableType(), paramTags);
  } else if (type.isUnion()) {
    return type
      .getUnionTypes()
      .flatMap((unionType) =>
        processComplexParameter(name, unionType, paramTags)
      );
  } else if (type.isArray()) {
    return processComplexParameter(
      `${name}[]`,
      type.getArrayElementTypeOrThrow(),
      paramTags
    );
  } else if (type.isObject()) {
    // Named range types (e.g. NumberRange) source their member descriptions from the method-level `@param name.member` tags;
    // anonymous options objects use their own inline property JSDoc as before.
    const rangeType = isRangeType(type);
    if (!rangeType && !isOptionsLikeType(type)) {
      return [];
    }

    return type
      .getApparentProperties()
      .flatMap((parameter) => {
        try {
          return processComplexParameterProperty(
            name,
            parameter,
            rangeType ? paramTags : undefined
          );
        } catch (error) {
          throw newProcessingError({
            type: 'property',
            name: `${name}.${parameter.getName()}`,
            source: parameter.getDeclarations()[0],
            cause: error,
          });
        }
      })
      .toSorted((a, b) => a.name.localeCompare(b.name));
  }

  return [];
}

function processComplexParameterProperty(
  name: string,
  parameter: Symbol,
  paramTags?: Record<string, JSDocTag>
) {
  const declaration = exactlyOne(
    parameter.getDeclarations(),
    'property declaration'
  ) as PropertySignature;
  const propertyType = declaration.getType();
  const jsdocs = getJsDocs(declaration);
  const deprecated = getDeprecated(jsdocs);
  // Use the `@param name.member` tag if available, otherwise the member's own JSDoc.
  const memberTag = paramTags?.[`${name}.${parameter.getName()}`];
  const description = memberTag
    ? getDescription(memberTag)
    : getDescription(jsdocs);

  return [
    {
      name: `${name}.${parameter.getName()}${getNameSuffix(propertyType)}`,
      type: attachShadowTypeDescriptions(
        getTypeText(propertyType, {
          abbreviate: false,
          stripUndefined: true,
        }),
        getShadowTypeDescriptions(declaration.getTypeNode())
      ),
      default: getDefault(jsdocs) ?? extractSummaryDefault(description),
      description:
        stripSummaryDefault(description) +
        (deprecated ? `\n\n**DEPRECATED:** ${deprecated}` : ''),
    },
  ];
}
