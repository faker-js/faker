import type { DeclarationReflection, ProjectReflection } from 'typedoc';
import { ReflectionKind } from 'typedoc';
import { newTypeDocApp, patchProject } from '../../../scripts/apidoc/utils';

/**
 * Loads the example methods using TypeDoc.
 */
export function loadExampleMethods(): Record<string, DeclarationReflection> {
  const app = newTypeDocApp();

  app.bootstrap({
    entryPoints: ['test/scripts/apidoc/signature.example.ts'],
    tsconfig: 'test/scripts/apidoc/tsconfig.json',
  });

  const project = app.convert();

  patchProject(project);

  const methods: Record<string, DeclarationReflection> = project
    .getChildrenByKind(ReflectionKind.Class)[0]
    .getChildrenByKind(ReflectionKind.Method)
    .reduce((a, v) => ({ ...a, [v.name]: v }), {});

  return methods;
}

/**
 * Loads the project using TypeDoc.
 */
export function loadProject(): ProjectReflection {
  const app = newTypeDocApp();

  app.bootstrap({
    entryPoints: ['src/index.ts'],
  });

  const project = app.convert();

  patchProject(project);

  return project;
}
