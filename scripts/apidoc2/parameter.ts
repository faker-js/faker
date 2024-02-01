import type { JSDoc, JSDocTag, ParameterDeclaration } from 'ts-morph';
import { JSDocParameterTag } from 'ts-morph';
import { getDescription } from './jsdocs';
import { getSourcePath } from './source';
import { getTypeText } from './type';
import { required } from './utils';

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

export function processParameters(
  parameters: ParameterDeclaration[],
  jsdocs: JSDoc
): RawApiDocsParameter[] {
  const paramTags = jsdocs
    .getTags()
    .filter((tag) => tag.getTagName() === 'param')
    .filter((tag) => tag instanceof JSDocParameterTag)
    .map((tag) => tag as JSDocParameterTag);

  return parameters.map((v) => {
    const name = v.getName();
    try {
      const jsdocTag = required(
        paramTags.find((tag) => tag.getName() === name),
        `@param ${name}`
      );
      return processParameter(v, jsdocTag);
    } catch (error: unknown) {
      throw new Error(
        `Error processing parameter ${name} at ${getSourcePath(v)}`,
        { cause: error }
      );
    }
  });
}

export function processParameter(
  parameter: ParameterDeclaration,
  jsdocTag: JSDocTag
): RawApiDocsParameter {
  return {
    name: parameter.getName(),
    type: getTypeText(parameter.getType()),
    default: parameter.getInitializer()?.getText(),
    description: getDescription(jsdocTag),
  };
}
