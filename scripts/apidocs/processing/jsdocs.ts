import type { JSDoc, JSDocableNode, JSDocTag } from 'ts-morph';
import { JSDocParameterTag, JSDocTemplateTag } from 'ts-morph';
import {
  allRequired,
  exactlyOne,
  optionalOne,
  required,
} from '../utils/value-checks';

export type JSDocableLikeNode = Pick<JSDocableNode, 'getJsDocs'>;

export function getJsDocs(node: JSDocableLikeNode): JSDoc {
  return exactlyOne(
    node.getJsDocs(),
    'jsdocs',
    'Please ensure that each method signature has JSDocs, and that all properties of option/object parameters are documented with both @param tags and inline JSDocs.'
  );
}

export function getDeprecated(jsdocs: JSDoc): string | undefined {
  return getOptionalTagFromJSDoc(jsdocs, 'deprecated');
}

export function getExperimental(jsdocs: JSDoc): true | undefined {
  return hasTagFromJSDoc(jsdocs, 'experimental') ? true : undefined;
}

export function getDescription(jsdocs: JSDoc | JSDocTag): string {
  return required(jsdocs.getCommentText(), 'jsdocs description');
}

export function getSince(jsdocs: JSDoc): string {
  return getExactlyOneTagFromJSDoc(jsdocs, 'since');
}

export function getTypeParameterTags(jsdocs: JSDoc): Record<string, JSDocTag> {
  return Object.fromEntries(
    jsdocs
      .getTags()
      .filter((tag) => tag.getTagName() === 'template')
      .filter((tag) => tag instanceof JSDocTemplateTag)
      .map((tag) => [tag.getTypeParameters()[0].getName(), tag] as const)
  );
}

export function getParameterTags(jsdocs: JSDoc): Record<string, JSDocTag> {
  return Object.fromEntries(
    jsdocs
      .getTags()
      .filter((tag) => tag.getTagName() === 'param')
      .filter((tag) => tag instanceof JSDocParameterTag)
      .map((tag) => [tag.getName(), tag] as const)
  );
}

export function getDefault(jsdocs: JSDoc): string | undefined {
  return (
    getOptionalTagFromJSDoc(jsdocs, `default`)
      // Prevent line breaks between the key and the value { foo: 'bar' }
      ?.replaceAll(': ', ': ')
  );
}

const defaultCommentRegex = /\s+Defaults to `([^`]+)`\..*/;

/**
 * Extracts the default value from a `Defaults to \`...\`.` summary hint, if present.
 *
 * @param description The description to extract the default value from.
 */
export function extractSummaryDefault(description: string): string | undefined {
  return defaultCommentRegex.exec(description)?.[1];
}

/**
 * Removes the `Defaults to \`...\`.` summary hint from the given description.
 *
 * @param description The description to remove the default value hint from.
 */
export function stripSummaryDefault(description: string): string {
  return description.replace(defaultCommentRegex, '');
}

export function getThrows(jsdocs: JSDoc): string[] {
  return getTagsFromJSDoc(jsdocs, 'throws');
}

export function getExamples(jsdocs: JSDoc): string[] {
  return getTagsFromJSDoc(jsdocs, 'example');
}

export function getSeeAlsos(jsdocs: JSDoc): string[] {
  return getTagsFromJSDoc(jsdocs, 'see', true);
}

export function getRemarks(jsdocs: JSDoc): string[] {
  return getTagsFromJSDoc(jsdocs, 'remark');
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

function getTagsFromJSDoc(
  jsdocs: JSDoc,
  type: string,
  full: boolean = false
): string[] {
  return allRequired(
    jsdocs
      .getTags()
      .filter((tag) => tag.getTagName() === type)
      .map((tag) =>
        full ? tag.getStructure().text?.toString() : tag.getCommentText()
      ),
    `@${type}`
  );
}

function hasTagFromJSDoc(jsdocs: JSDoc, type: string): boolean {
  return (
    optionalOne(
      jsdocs.getTags().filter((tag) => tag.getTagName() === type),
      `@${type}`
    ) != null
  );
}
