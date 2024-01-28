import type { ClassDeclaration, Project } from 'ts-morph';
import { processConstructors } from './method';
import { processModule } from './module';
import { getSourceLink } from './source';
import type { ApiDocPage } from './types';
import { mapBy, required } from './utils';

export function getClasses(
  project: Project,
  filter: (name: string) => boolean
): ClassDeclaration[] {
  return project
    .getSourceFiles()
    .flatMap((s) => s.getClasses())
    .filter((c) => filter(c.getNameOrThrow()));
}

function getClassesByName(
  project: Project,
  ...names: string[]
): ClassDeclaration[] {
  const classes = getClasses(project, (name) => names.includes(name));
  const byName = mapBy<ClassDeclaration, ClassDeclaration>(
    classes,
    (c: ClassDeclaration) => c.getNameOrThrow(),
    (c: ClassDeclaration) => c
  );
  return names.map((n) => required(byName[n], n));
}

export function processProjectClasses(
  project: Project,
  ...names: string[]
): ApiDocPage[] {
  return processClasses(getClassesByName(project, ...names));
}

function processClasses(classes: ClassDeclaration[]): ApiDocPage[] {
  return classes.map((c) => {
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
  const result = processModule(clazz, '');
  result.methods.unshift(...processConstructors(clazz.getConstructors()));
  return result;
}
