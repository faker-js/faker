import type {
  PropertySignature,
  Type,
  TypeParameterDeclaration,
} from 'ts-morph';
import { type JSDoc, type JSDocTag, type ParameterDeclaration } from 'ts-morph';
import {
  getDefault,
  getDescription,
  getJsDocs,
  getParameterTags,
  getTypeParameterTags,
} from './jsdocs';
import { getSourcePath } from './source';
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
  type: string;
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
    type: getTypeText(parameter.getType(), { resolveTypeParameters: true }),
    default: parameter.getDefault()?.getText(),
    description: getDescription(valueForKey(paramTags, parameter.getName())),
  };
}

export function processParameters(
  parameters: ParameterDeclaration[],
  jsdocs: JSDoc
): RawApiDocsParameter[] {
  const paramTags = getParameterTags(jsdocs);

  return parameters.flatMap((parameter) => {
    try {
      return processParameterEntry(parameter, paramTags);
    } catch (error) {
      throw new Error(
        `Error processing parameter ${parameter.getName()} at ${getSourcePath(parameter)}`,
        { cause: error }
      );
    }
  });
}

function processParameterEntry(
  parameter: ParameterDeclaration,
  paramTags: Record<string, JSDocTag>
): RawApiDocsParameter[] {
  const name = parameter.getName();
  return [
    processParameter(parameter, valueForKey(paramTags, name)),
    ...processComplexParameter(name, parameter.getType()),
  ];
}

type ParameterLikeDeclaration = Pick<
  ParameterDeclaration,
  'getName' | 'getType'
> &
  Partial<Pick<ParameterDeclaration, 'getInitializer'>>;

function processParameter(
  parameter: ParameterLikeDeclaration,
  jsdocTag: JSDocTag
): RawApiDocsParameter {
  const type = parameter.getType();
  return {
    name: `${parameter.getName()}${getNameSuffix(type)}`,
    type: getTypeText(type, {
      abbreviate: true,
      stripUndefined: true,
    }),
    default: parameter
      .getInitializer?.()
      ?.getText()
      .replace(/ as .+$/, ''),
    description: getDescription(jsdocTag),
  };
}

function processComplexParameter(
  name: string,
  type: Type
): RawApiDocsParameter[] {
  if (type.isNullable()) {
    return processComplexParameter(`${name}?`, type.getNonNullableType());
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
      .flatMap((property) => {
        const declaration = exactlyOne(
          property.getDeclarations(),
          'property declaration'
        ) as PropertySignature;
        const propertyType = declaration.getType();
        const jsdocs = getJsDocs(declaration);

        return [
          {
            name: `${name}.${property.getName()}${getNameSuffix(propertyType)}`,
            type: getTypeText(propertyType, {
              abbreviate: false,
              stripUndefined: true,
            }),
            default: getDefault(jsdocs),
            description: getDescription(jsdocs),
          },
        ];
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  return [];
}
