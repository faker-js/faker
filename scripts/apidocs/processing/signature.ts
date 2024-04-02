import type { MethodDeclaration } from 'ts-morph';
import { getProject } from '../project';
import { exactlyOne } from '../utils/value-checks';
import { newProcessingError } from './error';
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
import type { SourceableNode } from './source';
import type { RawApiDocsType } from './type';
import { getTypeText } from './type';

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
  returns: RawApiDocsType;
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
  signatures: SignatureLikeDeclaration[],
  implementation: SignatureLikeDeclaration
): RawApiDocsSignature[] {
  return signatures.map((signature, i) => {
    try {
      return processSignature(signature, implementation);
    } catch (error) {
      throw newProcessingError({
        type: 'signature',
        name: `${name}/${i}`,
        source: signature,
        cause: error,
      });
    }
  });
}

function processSignature(
  signature: SignatureLikeDeclaration,
  implementation: SignatureLikeDeclaration
): RawApiDocsSignature {
  const jsdocs = getJsDocs(signature);
  const parameters = [
    ...processTypeParameters(signature.getTypeParameters(), jsdocs),
    ...processParameters(
      signature.getParameters(),
      implementation.getParameters(),
      jsdocs
    ),
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
    throw newProcessingError({
      type: 'jsdocs',
      name: signature.getText(),
      source: jsdocs,
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
