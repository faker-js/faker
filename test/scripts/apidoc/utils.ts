import type {
  ClassDeclaration,
  FunctionDeclaration,
  SourceFile,
} from 'ts-morph';
import { getProject } from '../../../scripts/apidoc/project';

/**
 * Loads the example functions.
 */
export function loadExampleFunctions(): FunctionDeclaration[] {
  return loadProjectFile(
    'test/scripts/apidoc/signature.example.ts'
  ).getFunctions();
}

/**
 * Loads the example classes.
 */
export function loadExampleModules(): ClassDeclaration[] {
  return loadProjectFile('test/scripts/apidoc/module.example.ts').getClasses();
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
