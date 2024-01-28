import type { JSDoc, JSDocTag, ParameterDeclaration } from 'ts-morph';
import { JSDocParameterTag } from 'ts-morph';
import { getDescription } from './jsdoc';
import { getSourceLink } from './source';
import { getTypeText } from './type';
import type { ApiDocParameter } from './types';
import { required } from './utils';

export function processParameters(
  parameters: ParameterDeclaration[],
  jsdocs: JSDoc
): ApiDocParameter[] {
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
        `Error processing parameter ${name} at ${getSourceLink(v)}`,
        { cause: error }
      );
    }
  });
}

export function processParameter(
  parameter: ParameterDeclaration,
  jsdocTag: JSDocTag
): ApiDocParameter {
  const name = parameter.getName();
  const type = getTypeText(parameter.getType());
  const defaultValue = parameter.getInitializer()?.getText() ?? '';
  const description = getDescription(jsdocTag);

  return {
    name,
    type,
    defaultValue,
    description,
  };
}
