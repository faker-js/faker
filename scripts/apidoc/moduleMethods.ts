import type {
  DeclarationReflection,
  ProjectReflection,
  SignatureReflection,
} from 'typedoc';
import type { Method } from '../../docs/.vitepress/components/api-docs/method';
import { writeApiDocsModule } from './apiDocsWriter';
import { mdToHtml } from './markdown';
import { analyzeSignature } from './signature';
import {
  extractDeprecated,
  extractDescription,
  extractModuleFieldName,
  extractModuleName,
  extractRawExamples,
  selectApiMethodSignatures,
  selectApiModules,
} from './typedoc';
import type { ModuleSummary } from './utils';
import { adjustUrls } from './utils';

/**
 * Analyzes and writes the documentation for modules and their methods such as `faker.animal.cat()`.
 *
 * @param project The project used to extract the modules.
 * @returns The generated pages.
 */
export async function processModules(
  project: ProjectReflection
): Promise<ModuleSummary[]> {
  return Promise.all(selectApiModules(project).map(processModule));
}

/**
 * Analyzes and writes the documentation for a module and its methods such as `faker.animal.cat()`.
 *
 * @param module The module to process.
 * @returns The generated pages.
 */
async function processModule(
  module: DeclarationReflection
): Promise<ModuleSummary> {
  const moduleName = extractModuleName(module);
  console.log(`Processing Module ${moduleName}`);
  const moduleFieldName = extractModuleFieldName(module);
  const { comment, deprecated, examples } = analyzeModule(module);
  const methods = await processModuleMethods(
    module,
    `faker.${moduleFieldName}.`
  );

  return writeApiDocsModule(
    moduleName,
    moduleFieldName,
    comment,
    examples,
    deprecated,
    methods
  );
}

/**
 * Analyzes the documentation for a class.
 *
 * @param module The class to process.
 * @returns The class information.
 */
export function analyzeModule(module: DeclarationReflection): {
  comment: string;
  deprecated: string | undefined;
  examples: string | undefined;
} {
  const exampleTags = extractRawExamples(module);
  let examples;
  if (exampleTags.length > 0) {
    const code = '```';
    examples = mdToHtml(`${code}ts\n${exampleTags.join('\n').trim()}${code}\n`);
  }

  return {
    comment: adjustUrls(extractDescription(module)),
    deprecated: extractDeprecated(module),
    examples,
  };
}

/**
 * Processes all api methods of the given class. This does not include the constructor.
 *
 * @param module The module to process.
 * @param accessor The code used to access the methods within the module.
 * @returns A list containing the documentation for the api methods in the given module.
 */
export async function processModuleMethods(
  module: DeclarationReflection,
  accessor: string
): Promise<Method[]> {
  return processMethods(selectApiMethodSignatures(module), accessor);
}

/**
 * Processes all api methods.
 *
 * @param signatures The signatures to process.
 * @param accessor The code used to access the methods.
 * @returns A list containing the documentation for the api methods.
 */
export async function processMethods(
  signatures: Record<string, SignatureReflection>,
  accessor: string = ''
): Promise<Method[]> {
  const methods: Method[] = [];

  for (const [methodName, signature] of Object.entries(signatures)) {
    console.debug(`- ${methodName}`);
    methods.push(await analyzeSignature(signature, accessor, methodName));
  }

  return methods;
}
