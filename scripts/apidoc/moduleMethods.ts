import type {
  DeclarationReflection,
  ProjectReflection,
  SignatureReflection,
} from 'typedoc';
import { ReflectionKind } from 'typedoc';
import type { Method } from '../../docs/.vitepress/components/api-docs/method';
import { faker } from '../../src';
import { writeApiDocsData, writeApiDocsModulePage } from './apiDocsWriter';
import { analyzeSignature, toBlock } from './signature';
import type { PageIndex } from './utils';

/**
 * Selects the modules from the project that needs to be documented.
 *
 * @param project The project to extract the modules from.
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
 * Selects the methods from the module that needs to be documented.
 *
 * @param module The module to extract the methods from.
 * @returns The methods to document.
 */
export function selectApiMethods(
  module: DeclarationReflection
): DeclarationReflection[] {
  return module
    .getChildrenByKind(ReflectionKind.Method)
    .filter((method) => !method.flags.isPrivate);
}

/**
 * Selects the signature from the method that needs to be documented.
 *
 * @param method The method to extract the signature from.
 * @returns The signature to document.
 */
export function selectApiSignature(
  method: DeclarationReflection
): SignatureReflection {
  const signatures = method.signatures;
  if (signatures == null || signatures.length === 0) {
    throw new Error(`Method ${method.name} has no signature.`);
  }

  return signatures[signatures.length - 1];
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
  const { name } = module;
  // TODO @ST-DDT 2022-10-16: Remove in v10.
  // Typedoc prefers the name of the module that is exported first.
  if (name === 'AddressModule') {
    return 'Location';
  } else if (name === 'NameModule') {
    return 'Person';
  }

  return name.replace(/Module$/, '');
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
  for (const method of selectApiMethods(module)) {
    const methodName = method.name;
    console.debug(`- ${methodName}`);
    const signature = selectApiSignature(method);

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
