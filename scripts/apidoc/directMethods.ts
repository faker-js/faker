import * as TypeDoc from 'typedoc';
import { writeApiDocsData, writeApiDocsDirectPage } from './apiDocsWriter';
import { analyzeSignature } from './signature';
import type { Page, PageIndex } from './utils';

/**
 * Analyzes and writes the documentation for direct methods such as `faker.fake()`.
 *
 * @param project The project used to extract the direct methods.
 * @returns The generated pages.
 */
export function processDirectMethods(
  project: TypeDoc.ProjectReflection
): PageIndex {
  const pages: PageIndex = [];

  const directs = project
    .getChildrenByKind(TypeDoc.ReflectionKind.Class)
    .filter((ref) => ref.name === 'Faker')[0]
    .getChildrenByKind(TypeDoc.ReflectionKind.Property)
    .filter((ref) => ['fake', 'unique'].includes(ref.name));

  for (const direct of directs) {
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
export function processDirectMethod(
  direct: TypeDoc.DeclarationReflection
): Page {
  const methodName = direct.name;
  const capitalizedMethodName =
    methodName.substring(0, 1).toUpperCase() + methodName.substring(1);
  console.log(`Processing Direct: ${capitalizedMethodName}`);

  const signatures = (direct.type as TypeDoc.ReflectionType).declaration
    .signatures;
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
