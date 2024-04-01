import type { Options } from 'prettier';
import { format } from 'prettier';
import prettierConfig from '../../../.prettierrc.js';

/**
 * Formats markdown contents.
 *
 * @param text The text to format.
 */
export async function formatMarkdown(text: string): Promise<string> {
  return format(text, prettierMarkdown);
}

/**
 * Formats typedoc contents.
 *
 * @param text The text to format.
 */
export async function formatTypescript(text: string): Promise<string> {
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
