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
 *
 * @param options The TypeDoc options.
 * @param includeTestModules Whether to include the test modules.
 */
export async function loadProjectModules(
  options?: Partial<TypeDocOptions>,
  includeTestModules = false
): Promise<
  Record<string, [DeclarationReflection, Record<string, SignatureReflection>]>
> {
  const [, project] = await loadProject(options);

  const modules = selectApiModules(project, includeTestModules);

  return mapByName(modules, (m) => [m, selectApiMethodSignatures(m)]);
}

/**
 * Loads the example methods using TypeDoc.
 */
export async function loadExampleMethods(): Promise<
  Record<string, SignatureReflection>
> {
  const modules = await loadProjectModules(
    {
      entryPoints: ['test/scripts/apidoc/signature.example.ts'],
    },
    true
  );
  return modules['SignatureTest'][1];
}

/**
 * Loads the example modules using TypeDoc.
 */
export async function loadExampleModules(): Promise<
  Record<string, DeclarationReflection>
> {
  const modules = await loadProjectModules(
    {
      entryPoints: ['test/scripts/apidoc/module.example.ts'],
    },
    true
  );

  const result: Record<string, DeclarationReflection> = {};
  for (const key in modules) {
    result[key] = modules[key][0];
  }

  return result;
}
