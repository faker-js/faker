import type { ClassDeclaration, MethodDeclaration, SourceFile } from 'ts-morph';
import { getProject } from '../../../scripts/apidocs/project';

/**
 * Loads the example methods.
 */
export function loadExampleMethods(): Record<string, MethodDeclaration> {
  return Object.fromEntries(
    loadProjectFile('test/scripts/apidocs/method.example.ts')
      .getClassOrThrow('SignatureTest')
      .getMethods()
      .map((m) => [m.getName(), m] as const)
      .sort(([a], [b]) => a.localeCompare(b)) // Relevant for Object.keys() order
  );
}

/**
 * Loads the example classes.
 */
export function loadExampleClasses(): Record<string, ClassDeclaration> {
  return Object.fromEntries(
    loadProjectFile('test/scripts/apidocs/class.example.ts')
      .getClasses()
      .map((m) => [m.getNameOrThrow(), m] as const)
      .sort(([a], [b]) => a.localeCompare(b)) // Relevant for Object.keys() order
  );
}

/**
 * Loads the project.
 *
 * @param sourceFile The source file to load.
 */
function loadProjectFile(sourceFile: string): SourceFile {
  const project = getProject();

  return project.addSourceFileAtPath(sourceFile);
}
