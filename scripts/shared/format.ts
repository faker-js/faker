import { format } from 'oxfmt';
import { formatOptions } from '../../oxfmt.config';

/**
 * Formats Markdown contents.
 *
 * @param text The text to format.
 */
export async function formatMarkdown(text: string): Promise<string> {
  return formatAs('markdown.md', text);
}

/**
 * Formats TypeScript contents.
 *
 * @param text The text to format.
 */
export async function formatTypescript(text: string): Promise<string> {
  return formatAs('typescript.ts', text);
}

/**
 * Formats contents using the parser that oxfmt infers from the given file name.
 *
 * @param fileName The virtual file name that determines the parser.
 * @param text The text to format.
 */
async function formatAs(fileName: string, text: string): Promise<string> {
  const { code, errors } = await format(fileName, text, formatOptions);

  if (errors.length > 0) {
    throw new Error(
      `Failed to format ${fileName}:\n${errors.map(({ message }) => message).join('\n')}`
    );
  }

  return code;
}
