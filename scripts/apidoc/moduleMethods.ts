import type { DeclarationReflection, ProjectReflection } from 'typedoc';
import { ReflectionKind } from 'typedoc';
import type { Method } from '../../docs/.vitepress/components/api-docs/method';
import { faker } from '../../src';
import { writeApiDocsData, writeApiDocsModulePage } from './apiDocsWriter';
import { analyzeSignature, toBlock } from './signature';
import type { PageIndex } from './utils';

/**
 * Selects the modules from the project that needs to be documented.
 *
 * @param project The project used to extract the modules.
 * @returns The modules to document.
 */
export function selectApiModules(
  project: ProjectReflection
): DeclarationReflection[] {
  return project
    .getChildrenByKind(ReflectionKind.Class)
    .filter((module) => faker[extractModuleFieldName(module)] != null);
}

/**
 * Analyzes and writes the documentation for modules and their methods such as `faker.animal.cat()`.
 *
 * @param project The project used to extract the modules.
 * @returns The generated pages.
 */
export function processModuleMethods(project: ProjectReflection): PageIndex {
  const pages: PageIndex = [];

  // Generate module files
  for (const module of selectApiModules(project)) {
    pages.push(...processModuleMethod(module));
  }

  return pages;
}

export function extractModuleName(module: DeclarationReflection): string {
  return module.name.replace(/Module$/, '');
}

function extractModuleFieldName(module: DeclarationReflection): string {
  const moduleName = extractModuleName(module);
  return moduleName.substring(0, 1).toLowerCase() + moduleName.substring(1);
}

/**
 * Analyzes and writes the documentation for a module and its methods such as `faker.animal.cat()`.
 *
 * @param module The module to process.
 * @returns The generated pages.
 */
function processModuleMethod(module: DeclarationReflection): PageIndex {
  const moduleName = extractModuleName(module);
  const moduleFieldName = extractModuleFieldName(module);
  console.log(`Processing Module ${moduleName}`);

  const methods: Method[] = [];

  // Generate method section
  for (const method of module.getChildrenByKind(ReflectionKind.Method)) {
    const methodName = method.name;
    console.debug(`- ${methodName}`);
    const signatures = method.signatures;
    const signature = signatures[signatures.length - 1];

    methods.push(analyzeSignature(signature, moduleFieldName, methodName));
  }

  writeApiDocsModulePage(
    moduleName,
    moduleFieldName,
    toBlock(module.comment),
    methods
  );
  writeApiDocsData(moduleFieldName, methods);

  return [
    {
      text: moduleName,
      link: `/api/${moduleFieldName}.html`,
    },
  ];
}
