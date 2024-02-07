import type { MethodDeclaration } from 'ts-morph';
import type { JSDocableLikeNode } from './jsdocs';
import {
  getDeprecated,
  getDescription,
  getExamples,
  getJsDocs,
  getSeeAlsos,
  getSince,
  getThrows,
} from './jsdocs';
import type { RawApiDocsParameter } from './parameter';
import { processParameters, processTypeParameters } from './parameter';
import { getProject } from './project';
import { shouldProcessSignature } from './select';
import { getSourcePath, type SourceableNode } from './source';
import { getTypeText } from './type';
import { exactlyOne } from './utils';

/**
 * Represents a method signature in the raw API docs.
 */
export interface RawApiDocsSignature {
  /**
   * The deprecation notice of the signature, if it has one.
   */
  deprecated: string | undefined;
  /**
   * The description of the signature.
   */
  description: string;
  /**
   * The version when the signature was added.
   */
  since: string;
  /**
   * The parameters of the signature.
   */
  parameters: RawApiDocsParameter[];
  /**
   * The return type of the signature.
   */
  returns: string;
  /**
   * The exceptions thrown by the signature.
   */
  throws: string[];
  /**
   * The full call signature as text.
   */
  signature: string;
  /**
   * The usage examples of the signature.
   */
  examples: string[];
  /**
   * The see also links of the signature.
   */
  seeAlsos: string[];
}

export type SignatureLikeDeclaration = Pick<
  MethodDeclaration,
  'getTypeParameters' | 'getParameters' | 'getReturnType' | 'getText'
> &
  JSDocableLikeNode &
  SourceableNode;

export function processSignatures(
  name: string,
  signatures: SignatureLikeDeclaration[]
): RawApiDocsSignature[] {
  return signatures
    .filter((_, i) => shouldProcessSignature(name, i))
    .map((s, i) => {
      try {
        return processSignature(s);
      } catch (error) {
        throw new Error(
          `Error processing signature ${name}/${i} at ${getSourcePath(s)}}`,
          { cause: error }
        );
      }
    });
}

function processSignature(
  signature: SignatureLikeDeclaration
): RawApiDocsSignature {
  const jsdocs = getJsDocs(signature);
  const parameters = [
    ...processTypeParameters(signature.getTypeParameters(), jsdocs),
    ...processParameters(signature.getParameters(), jsdocs),
  ];
  const returns = getTypeText(signature.getReturnType());

  try {
    return {
      deprecated: getDeprecated(jsdocs),
      description: getDescription(jsdocs),
      since: getSince(jsdocs),
      parameters,
      returns,
      throws: getThrows(jsdocs),
      signature: getSignatureText(signature),
      examples: getExamples(jsdocs),
      seeAlsos: getSeeAlsos(jsdocs),
    };
  } catch (error) {
    throw new Error(`Error processing jsdocs at ${getSourcePath(jsdocs)}`, {
      cause: error,
    });
  }
}

// Cache the project for performance reasons
const signatureExtractionProject = getProject({
  skipAddingFilesFromTsConfig: true,
});

function getSignatureText(signature: SignatureLikeDeclaration): string {
  const fullText = signature
    .getText()
    // Remove all jsdocs
    .replaceAll(/ *\/\*\*[^\n]*\n(\s*\*[^\n]*\n)*\s*\*\/\n/g, '')
    // Remove all empty lines
    .replaceAll(/\n\n+/g, '\n')
    // Remove the export function keyword for consistency with member methods
    .replace(/^export function /, '');

  // Is this already a signature
  if (fullText.endsWith(';')) {
    // Restore the function keyword
    return `function ${fullText}`;
  }

  // Create a copy of the signature to keep the line numbers unchanged
  // and for performance reasons, as removing and re-adding the body is slow.
  // We use a function here to avoid unnecessary boilerplate
  const fn = exactlyOne(
    signatureExtractionProject
      .createSourceFile('temp.ts', `function ${fullText}`, { overwrite: true })
      .getFunctions(),
    'function signature'
  );
  fn.removeBody();
  return fn.getText();
}
