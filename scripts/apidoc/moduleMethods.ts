import * as TypeDoc from 'typedoc';
import type { Method } from '../../docs/.vitepress/components/api-docs/method';
import { faker } from '../../src';
import { writeApiDocsData, writeApiDocsModulePage } from './apiDocsWriter';
import { analyzeSignature, toBlock } from './signature';
import type { PageIndex } from './utils';

/**
 * Analyzes and writes the documentation for modules and their methods such as `faker.animal.cat()`.
 *
 * @param project The project used to extract the modules.
 * @returns The generated pages.
 */
export function processModuleMethods(
  project: TypeDoc.ProjectReflection
): PageIndex {
  const modules = project
    .getChildrenByKind(TypeDoc.ReflectionKind.Namespace)[0]
    .getChildrenByKind(TypeDoc.ReflectionKind.Class);

  const pages: PageIndex = [];
  // Generate module file
  for (const module of modules) {
    pages.push(...processModuleMethod(module));
  }

  return pages;
}

/**
 * Analyzes and writes the documentation for a module and its methods such as `faker.animal.cat()`.
 *
 * @param direct The module to process.
 * @returns The generated pages.
 */
function processModuleMethod(module: TypeDoc.DeclarationReflection): PageIndex {
  const moduleName = module.name.replace('_', '');
  const lowerModuleName =
    moduleName.substring(0, 1).toLowerCase() + moduleName.substring(1);
  if (faker[lowerModuleName] === undefined) {
    return [];
  }
  console.log(`Processing Module ${moduleName}`);

  const methods: Method[] = [];

  // Generate method section
  for (const method of module.getChildrenByKind(
    TypeDoc.ReflectionKind.Method
  )) {
    const methodName = method.name;
    console.debug(`- ${methodName}`);
    const signatures = method.signatures;
    const signature = signatures[signatures.length - 1];

    methods.push(analyzeSignature(signature, lowerModuleName, methodName));
  }

  writeApiDocsModulePage(
    moduleName,
    lowerModuleName,
    toBlock(module.comment),
    methods
  );
  writeApiDocsData(lowerModuleName, methods);

  return [
    {
      text: moduleName,
      link: `/api/${lowerModuleName}.html`,
    },
  ];
}
