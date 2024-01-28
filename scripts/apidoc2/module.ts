import type { ClassDeclaration, Project } from 'ts-morph';
import { getClasses } from './class';
import { getDeprecated, getDescription, getExamples, getJsDocs } from './jsdoc';
import { processMethods } from './method';
import { getSourcePath } from './source';
import type { ApiDocPage } from './types';
import { required } from './utils';

export function processModuleClasses(project: Project): ApiDocPage[] {
  return processModules(
    getClasses(
      project,
      (name) => name.endsWith('Module') && !name.startsWith('Simple')
    )
  ).toSorted((a, b) => a.title.localeCompare(b.title));
}

function processModules(modules: ClassDeclaration[]): ApiDocPage[] {
  return modules.map((v) => {
    try {
      return processModule(v, 'Modules');
    } catch (error: unknown) {
      throw new Error(
        `Error processing module ${v.getName()} at ${getSourcePath(v)}`,
        {
          cause: error,
        }
      );
    }
  });
}

export function processModule(
  module: ClassDeclaration,
  category: string
): ApiDocPage {
  const jsdocs = getJsDocs(module);

  const title = required(module.getNameOrThrow(), 'module name').replace(
    /Module$/,
    ''
  );
  const camelTitle = toCamelCase(title);
  const deprecated = getDeprecated(jsdocs);
  const description = getDescription(jsdocs);
  const examples = getExamples(jsdocs);
  const methods = processMethods(module.getMethods()).toSorted((a, b) =>
    a.name.localeCompare(b.name)
  );

  return {
    title,
    camelTitle,
    category,
    deprecated,
    description,
    examples,
    methods,
  };
}

function toCamelCase(value: string): string {
  return value.substring(0, 1).toLowerCase() + value.substring(1);
}
