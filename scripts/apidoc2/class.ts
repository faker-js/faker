import type { ClassDeclaration, Project } from 'ts-morph';
import { processConstructors } from './method';
import { processModule } from './module';
import { getSourceLink } from './source';
import type { ApiDocPage } from './types';
import { mapBy, required } from './utils';

export function getClasses(
  project: Project,
  ...names: string[]
): ClassDeclaration[] {
  const byName = mapBy(
    project
      .getSourceFiles()
      .flatMap((s) => s.getClasses())
      .filter((c: ClassDeclaration) => names.includes(c.getNameOrThrow())),
    (c: ClassDeclaration) => c.getNameOrThrow(),
    (c: ClassDeclaration) => c
  );
  return names.map((n) => required(byName[n], n));
}

export function processProjectClasses(
  project: Project,
  ...names: string[]
): ApiDocPage[] {
  return processClasses(getClasses(project, ...names));
}

function processClasses(clazzes: ClassDeclaration[]): ApiDocPage[] {
  return clazzes.map((c) => {
    try {
      return processClass(c);
    } catch (error) {
      throw new Error(
        `Error processing class ${c.getNameOrThrow()} at ${getSourceLink(c)}`,
        {
          cause: error,
        }
      );
    }
  });
}

function processClass(clazz: ClassDeclaration): ApiDocPage {
  const result = processModule(clazz);
  result.methods.unshift(...processConstructors(clazz.getConstructors()));
  return result;
}
