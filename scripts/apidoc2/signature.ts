import type { MethodDeclaration } from 'ts-morph';
import type { JSDocableLikeNode } from './jsdoc';
import {
  getDeprecated,
  getDescription,
  getExample,
  getJsDocs,
  getSeeAlso,
  getSince,
} from './jsdoc';
import { processParameters } from './parameter';
import type { SourceableNode } from './source';
import { getTypeText } from './type';
import type { ApiDocSignature } from './types';

export type SignatureLikeDeclaration = Pick<
  MethodDeclaration,
  'getParameters' | 'getReturnType'
> &
  JSDocableLikeNode &
  SourceableNode;

export function processSignature(
  signature: SignatureLikeDeclaration
): ApiDocSignature {
  const jsdocs = getJsDocs(signature);

  const deprecated = getDeprecated(jsdocs);
  const description = getDescription(jsdocs);
  const since = getSince(jsdocs);
  const parameters = processParameters(signature.getParameters(), jsdocs);
  const returns = getTypeText(signature.getReturnType());
  const example = getExample(jsdocs);
  const seeAlso = getSeeAlso(jsdocs);

  return {
    deprecated,
    description,
    since,
    parameters,
    returns,
    example,
    seeAlso,
  };
}
