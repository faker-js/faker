import type {
  DeclarationReflection,
  ProjectReflection,
  ReflectionType,
} from 'typedoc';
import { ReflectionKind } from 'typedoc';
import { writeApiDocsData, writeApiDocsDirectPage } from './apiDocsWriter';
import { analyzeSignature } from './signature';
import type { Page, PageIndex } from './utils';

/**
 * Selects the direct methods from the project that needs to be documented.
 *
 * @param project The project used to extract the direct methods.
 * @returns The direct methods to document.
 */
export function selectDirectMethods(
  project: ProjectReflection
): DeclarationReflection[] {
  return project
    .getChildrenByKind(ReflectionKind.Class)
    .filter((ref) => ref.name === 'Faker')[0]
    .getChildrenByKind(ReflectionKind.Property)
    .filter((ref) => ['fake', 'unique'].includes(ref.name));
}

/**
 * Analyzes and writes the documentation for direct methods such as `faker.fake()`.
 *
 * @param project The project used to extract the direct methods.
 * @returns The generated pages.
 */
export function processDirectMethods(project: ProjectReflection): PageIndex {
  const pages: PageIndex = [];

  // Generate direct method files
  for (const direct of selectDirectMethods(project)) {
    pages.push(processDirectMethod(direct));
  }

  return pages;
}

/**
 * Analyzes and writes the documentation for a direct method such as `faker.fake()`.
 *
 * @param direct The direct method to process.
 * @returns The generated pages.
 */
export function processDirectMethod(direct: DeclarationReflection): Page {
  const methodName = direct.name;
  const capitalizedMethodName =
    methodName.substring(0, 1).toUpperCase() + methodName.substring(1);
  console.log(`Processing Direct: ${capitalizedMethodName}`);

  const signatures = (direct.type as ReflectionType).declaration.signatures;
  const signature = signatures[signatures.length - 1];

  writeApiDocsDirectPage(methodName, capitalizedMethodName);
  writeApiDocsData(methodName, [
    analyzeSignature(signature, undefined, methodName),
  ]);

  return {
    text: capitalizedMethodName,
    link: `/api/${methodName}.html`,
  };
}
