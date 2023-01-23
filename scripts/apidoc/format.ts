import type { Options } from 'prettier';
import { format } from 'prettier';
import prettierConfig from '../../.prettierrc.cjs';

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
