import { resolve } from 'node:path';
import type { Options } from 'prettier';
import { format } from 'prettier';
import type {
  CommentDisplayPart,
  CommentTag,
  SignatureReflection,
} from 'typedoc';
import * as TypeDoc from 'typedoc';
import prettierConfig from '../../.prettierrc.cjs';
import {
  DefaultParameterAwareSerializer,
  parameterDefaultReader,
  patchProjectParameterDefaults,
} from './parameterDefaults';

export type Page = { text: string; link: string };
export type PageIndex = Array<Page>;

const pathRoot = resolve(__dirname, '..', '..');
export const pathDocsDir = resolve(pathRoot, 'docs');
export const pathOutputDir = resolve(pathDocsDir, 'api');

/**
 * Creates and configures a new typedoc application.
 */
export function newTypeDocApp(): TypeDoc.Application {
  const app = new TypeDoc.Application();

  app.options.addReader(new TypeDoc.TSConfigReader());
  // If you want TypeDoc to load typedoc.json files
  //app.options.addReader(new TypeDoc.TypeDocReader());

  // Read parameter defaults
  app.converter.on(
    TypeDoc.Converter.EVENT_CREATE_DECLARATION,
    parameterDefaultReader
  );
  // Add to debug json output
  app.serializer.addSerializer(new DefaultParameterAwareSerializer());

  return app;
}

/**
 * Apply our patches to the generated typedoc data.
 *
 * This is moved to a separate method to allow printing/saving the original content before patching it.
 *
 * @param project The project to patch.
 */
export function patchProject(project: TypeDoc.ProjectReflection): void {
  patchProjectParameterDefaults(project);
}

/**
 * Formats markdown contents.
 *
 * @param text The text to format.
 */
export function formatMarkdown(text: string): string {
  return format(text, prettierMarkdown);
}

/**
 * Formats typedoc contents.
 *
 * @param text The text to format.
 */
export function formatTypescript(text: string): string {
  return format(text, prettierTypescript);
}

const prettierMarkdown: Options = {
  ...prettierConfig,
  parser: 'markdown',
};

const prettierTypescript: Options = {
  ...prettierConfig,
  parser: 'typescript',
};

/**
 * Extracts the text (md) from a jsdoc tag.
 *
 * @param tag The tag to extract the text from.
 * @param signature The signature to extract the text from.
 */
export function extractTagContent(
  tag: `@${string}`,
  signature?: SignatureReflection
): string[] {
  return signature?.comment?.getTags(tag).map(joinTagContent) ?? [];
}

/**
 * Extracts the examples from the jsdocs without the surrounding md code block.
 *
 * @param signature The signature to extract the examples from.
 */
export function extractRawExamples(signature?: SignatureReflection): string[] {
  return extractTagContent('@example', signature).map((tag) =>
    tag.replace(/^```ts\n/, '').replace(/\n```$/, '')
  );
}

/**
 * Joins the parts of the given jsdocs tag.
 */
export function joinTagContent(tag: CommentTag): string {
  return joinTagParts(tag?.content);
}

export function joinTagParts(parts: CommentDisplayPart[]): string;
export function joinTagParts(parts?: CommentDisplayPart[]): string | undefined;
export function joinTagParts(parts?: CommentDisplayPart[]): string | undefined {
  return parts?.map((part) => part.text).join('');
}

/**
 * Checks if the given signature is deprecated.
 *
 * @param signature The signature to check.
 *
 * @returns `true` if it is deprecated, otherwise `false`.
 */
export function isDeprecated(signature: SignatureReflection): boolean {
  return extractTagContent('@deprecated', signature).length > 0;
}
