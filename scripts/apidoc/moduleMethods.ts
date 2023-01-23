import type { DeclarationReflection, ProjectReflection } from 'typedoc';
import type { Method } from '../../docs/.vitepress/components/api-docs/method';
import { writeApiDocsData, writeApiDocsModulePage } from './apiDocsWriter';
import { analyzeSignature, toBlock } from './signature';
import {
  extractModuleFieldName,
  extractModuleName,
  selectApiMethodSignatures,
  selectApiModules,
} from './typedoc';
import type { PageAndDiffIndex } from './utils';
import { diffHash } from './utils';

/**
 * Analyzes and writes the documentation for modules and their methods such as `faker.animal.cat()`.
 *
 * @param project The project used to extract the modules.
 * @returns The generated pages.
 */
export function processModuleMethods(
  project: ProjectReflection
): PageAndDiffIndex {
  const pages: PageAndDiffIndex = [];

  // Generate module files
  for (const module of selectApiModules(project)) {
    pages.push(...processModuleMethod(module));
  }

  return pages;
}

/**
 * Analyzes and writes the documentation for a module and its methods such as `faker.animal.cat()`.
 *
 * @param module The module to process.
 * @returns The generated pages.
 */
function processModuleMethod(module: DeclarationReflection): PageAndDiffIndex {
  const moduleName = extractModuleName(module);
  const moduleFieldName = extractModuleFieldName(module);
  console.log(`Processing Module ${moduleName}`);

  const methods: Method[] = [];

  // Generate method section
  for (const [methodName, signature] of Object.entries(
    selectApiMethodSignatures(module)
  )) {
    console.debug(`- ${methodName}`);

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
      diff: methods.reduce(
        (data, method) => ({
          ...data,
          [method.name]: diffHash(method),
        }),
        {
          moduleHash: diffHash({
            name: moduleName,
            field: moduleFieldName,
            comment: toBlock(module.comment),
          }),
        }
      ),
    },
  ];
}
