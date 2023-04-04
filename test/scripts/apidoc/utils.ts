import type {
  DeclarationReflection,
  SignatureReflection,
  TypeDocOptions,
} from 'typedoc';
import {
  loadProject,
  selectApiMethodSignatures,
  selectApiModules,
} from '../../../scripts/apidoc/typedoc';
import { mapByName } from '../../../scripts/apidoc/utils';

/**
 * Returns a record with the (Module-Name -> (Method-Name -> Method-Signature)) for the project.
 */
export function loadProjectModules(
  options?: Partial<TypeDocOptions>,
  includeTestModules = false
): [
  Record<string, DeclarationReflection>,
  Record<string, Record<string, SignatureReflection>>
] {
  const [, project] = loadProject(options);

  const modules = selectApiModules(project, includeTestModules);

  return [
    mapByName(modules, (m) => m),
    mapByName(modules, selectApiMethodSignatures),
  ];
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
  )[1]['SignatureTest'];
}
