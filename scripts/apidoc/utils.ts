import { resolve } from 'node:path';
import type { Options } from 'prettier';
import { format } from 'prettier';
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
