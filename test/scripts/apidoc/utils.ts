import type { SignatureReflection, TypeDocOptions } from 'typedoc';
import {
  newTypeDocApp,
  patchProject,
  selectApiMethodSignatures,
  selectApiModules,
} from '../../../scripts/apidoc/typedoc';
import { mapByName } from '../../../scripts/apidoc/utils';

/**
 * Returns a record with the (Module-Name -> (Method-Name -> Method-Signature)) for the project.
 */
export function loadProjectModules(
  options: Partial<TypeDocOptions> = {
    entryPoints: ['src/index.ts'],
  },
  includeTestModules = false
): Record<string, Record<string, SignatureReflection>> {
  const app = newTypeDocApp();

  app.bootstrap(options);

  const project = app.convert();

  if (project == null) {
    throw new Error('Failed to convert project');
  }

  patchProject(project);

  const modules = selectApiModules(project, includeTestModules);

  return mapByName(modules, selectApiMethodSignatures);
}

/**
 * Loads the example methods using TypeDoc.
 */
export function loadExampleMethods(): Record<string, SignatureReflection> {
  return loadProjectModules(
    {
      entryPoints: ['test/scripts/apidoc/signature.example.ts'],
      tsconfig: 'test/scripts/apidoc/tsconfig.json',
    },
    true
  )['SignatureTest'];
}
