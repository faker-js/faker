import type { JSDoc, JSDocTag, JSDocableNode } from 'ts-morph';
import {
  allRequired,
  onlyOne as exactlyOne,
  optionalOne,
  required,
} from './utils';

export type JSDocableLikeNode = Pick<JSDocableNode, 'getJsDocs'>;

export function getJsDocs(node: JSDocableLikeNode): JSDoc {
  return exactlyOne(node.getJsDocs(), 'jsdocs');
}

export function getDeprecated(jsdocs: JSDoc): string | undefined {
  return getOptionalTagFromJSDoc(jsdocs, 'deprecated');
}

export function getDescription(jsdocs: JSDoc | JSDocTag): string {
  return required(jsdocs.getCommentText(), 'jsdocs description');
}

export function getSince(jsdocs: JSDoc): string {
  return getExactlyOneTagFromJSDoc(jsdocs, 'since');
}

export function getThrows(jsdocs: JSDoc): string[] {
  return getTagsFromJSDoc(jsdocs, 'throws');
}

export function getExamples(jsdocs: JSDoc): string[] {
  return getTagsFromJSDoc(jsdocs, 'example');
}

export function getSeeAlsos(jsdocs: JSDoc): string[] {
  return getTagsFromJSDoc(jsdocs, 'see');
}

function getOptionalTagFromJSDoc(
  jsdocs: JSDoc,
  type: string
): string | undefined {
  return optionalOne(getTagsFromJSDoc(jsdocs, type), `@${type}`);
}

function getExactlyOneTagFromJSDoc(jsdocs: JSDoc, type: string): string {
  return exactlyOne(getTagsFromJSDoc(jsdocs, type), `@${type}`);
}

function getTagsFromJSDoc(jsdocs: JSDoc, type: string): string[] {
  return allRequired(
    jsdocs
      .getTags()
      .filter((tag) => tag.getTagName() === type)
      .map((tag) => tag.getCommentText()),
    `@${type}`
  );
}