import type {
  PropertySignature,
  Type,
  TypeParameterDeclaration,
} from 'ts-morph';
import { type JSDoc, type JSDocTag, type ParameterDeclaration } from 'ts-morph';
import {
  getDefault,
  getDeprecated,
  getDescription,
  getJsDocs,
  getParameterTags,
  getTypeParameterTags,
} from './jsdocs';
import { shouldProcessParameter } from './select';
import { getSourcePath } from './source';
import type { RawApiDocsType } from './type';
import { getNameSuffix, getTypeText, isOptionsLikeType } from './type';
import { exactlyOne, valueForKey } from './utils';

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

  return parameters
    .filter((p) => shouldProcessParameter(`<${p.getName()}>`))
    .flatMap((parameter) => {
      try {
        return processTypeParameterEntry(parameter, paramTags);
      } catch (error) {
        throw new Error(
          `Error processing type parameter ${parameter.getText()} at ${getSourcePath(
            parameter
          )}`,
          { cause: error }
        );
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
    implParameters.map((p) => [p.getName(), getDefaultValue(p)])
  );

  return signatureParameters
    .filter((p) => shouldProcessParameter(p.getName()))
    .flatMap((p) => {
      try {
        return processParameter(
          p,
          paramTags,
          implParameterDefaults[p.getName()]
        );
      } catch (error) {
        throw new Error(
          `Error processing parameter ${p.getName()} at ${getSourcePath(p)}`,
          { cause: error }
        );
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
    ...processComplexParameter(name, parameter.getType()),
  ];
}

type ParameterLikeDeclaration = Pick<
  ParameterDeclaration,
  'getName' | 'getType'
> &
  Partial<Pick<ParameterDeclaration, 'getInitializer'>>;

function processSimpleParameter(
  parameter: ParameterLikeDeclaration,
  jsdocTag: JSDocTag,
  implementationDefault: string | undefined
): RawApiDocsParameter {
  const name = parameter.getName();
  const type = parameter.getType();
  return {
    name: `${name}${getNameSuffix(type)}`,
    type: getTypeText(type, {
      abbreviate: true,
      stripUndefined: true,
    }),
    default: getDefaultValue(parameter) ?? implementationDefault,
    description: getDescription(jsdocTag),
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
  type: Type
): RawApiDocsParameter[] {
  if (type.isNullable()) {
    return processComplexParameter(name, type.getNonNullableType());
  } else if (type.isUnion()) {
    return type
      .getUnionTypes()
      .flatMap((unionType) => processComplexParameter(name, unionType));
  } else if (type.isArray()) {
    return processComplexParameter(
      `${name}[]`,
      type.getArrayElementTypeOrThrow()
    );
  } else if (type.isObject()) {
    if (!isOptionsLikeType(type)) {
      return [];
    }

    return type
      .getApparentProperties()
      .filter((p) => shouldProcessParameter(`${name}.${p.getName()}`))
      .flatMap((p) => {
        const declaration = exactlyOne(
          p.getDeclarations(),
          'property declaration'
        ) as PropertySignature;
        const propertyType = declaration.getType();
        const jsdocs = getJsDocs(declaration);
        const deprecated = getDeprecated(jsdocs);

        return [
          {
            name: `${name}.${p.getName()}${getNameSuffix(propertyType)}`,
            type: getTypeText(propertyType, {
              abbreviate: false,
              stripUndefined: true,
            }),
            default: getDefault(jsdocs),
            description:
              getDescription(jsdocs) +
              (deprecated ? `\n\n**DEPRECATED:** ${deprecated}` : ''),
          },
        ];
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  return [];
}
