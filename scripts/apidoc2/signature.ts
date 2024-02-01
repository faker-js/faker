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
import { processParameters } from './parameter';
import { getSourcePath, type SourceableNode } from './source';
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
  returns: string;
  /**
   * The exceptions thrown by the signature.
   */
  throws: string[];
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
  'getParameters' | 'getReturnType'
> &
  JSDocableLikeNode &
  SourceableNode;

export function processSignature(
  signature: SignatureLikeDeclaration
): RawApiDocsSignature {
  const jsdocs = getJsDocs(signature);
  const parameters = processParameters(signature.getParameters(), jsdocs);
  const returns = getTypeText(signature.getReturnType());

  try {
    return {
      deprecated: getDeprecated(jsdocs),
      description: getDescription(jsdocs),
      since: getSince(jsdocs),
      parameters,
      returns,
      throws: getThrows(jsdocs),
      examples: getExamples(jsdocs),
      seeAlsos: getSeeAlsos(jsdocs),
    };
  } catch (error) {
    throw new Error(`Error processing jsdocs at ${getSourcePath(jsdocs)}`, {
      cause: error,
    });
  }
}
