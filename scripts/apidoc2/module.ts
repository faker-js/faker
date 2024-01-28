import type { ClassDeclaration } from 'ts-morph';
import { getDeprecated, getDescription, getJsDocs } from './jsdoc';
import { processMethods } from './method';
import { getSourceLink } from './source';
import type { ApiDocPage } from './types';
import { required } from './utils';

export function processModules(modules: ClassDeclaration[]): ApiDocPage[] {
  return modules.map((v) => {
    try {
      return processModule(v);
    } catch (error: unknown) {
      throw new Error(
        `Error processing module ${v.getName()} at ${getSourceLink(v)}`,
        {
          cause: error,
        }
      );
    }
  });
}

export function processModule(module: ClassDeclaration): ApiDocPage {
  const jsdocs = getJsDocs(module);

  const title = required(module.getNameOrThrow(), 'module name');
  const deprecated = getDeprecated(jsdocs);
  const description = getDescription(jsdocs);
  const methods = processMethods(module.getMethods());

  return {
    title,
    deprecated,
    description,
    methods,
  };
}
