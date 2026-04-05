import sanitizeHtml from 'sanitize-html';
import type { MarkdownRenderer } from 'vitepress';
import { createMarkdownRenderer } from 'vitepress';
import vitepressConfig from '../../docs/.vitepress/config';
import { FILE_PATH_API_DOCS } from './paths';

let markdown: MarkdownRenderer;

export async function initMarkdownRenderer(): Promise<void> {
  markdown ??= await createMarkdownRenderer(
    FILE_PATH_API_DOCS,
    vitepressConfig.markdown,
    '/'
  );
}

const htmlSanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    'a',
    'button',
    'code',
    'div',
    'li',
    'p',
    'pre',
    'span',
    'strong',
    'ul',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    button: ['class', 'title'],
    div: ['class'],
    pre: ['class', 'dir', 'style', 'v-pre', 'tabindex'],
    span: ['class', 'style'],
  },
  selfClosing: [],
};

function comparableSanitizedHtml(html: string): string {
  return html
    .replaceAll(/&#x[0-9A-F]{2};/g, (x) =>
      String.fromCodePoint(Number.parseInt(x.slice(3, -1), 16))
    )
    .replaceAll('&gt;', '>')
    .replaceAll('&lt;', '<')
    .replaceAll('&amp;', '&')
    .replaceAll('=""', '')
    .replaceAll(' ', '');
}

/**
 * Converts a Typescript code block to an HTML string and sanitizes it.
 *
 * @param code The code to convert.
 *
 * @returns The converted HTML string.
 */
export async function codeToHtml(code: string): Promise<string> {
  const delimiter = '```';
  return mdToHtml(`${delimiter}ts\n${code}\n${delimiter}`);
}

/**
 * Converts Markdown to an HTML string and sanitizes it.
 *
 * @param md The markdown to convert.
 * @param inline Whether to render the markdown as inline, without a wrapping `<p>` tag. Defaults to `false`.
 *
 * @returns The converted HTML string.
 */
export async function mdToHtml(md: string, inline?: boolean): Promise<string>;
/**
 * Converts Markdown to an HTML string and sanitizes it.
 *
 * @param md The markdown to convert.
 * @param inline Whether to render the markdown as inline, without a wrapping `<p>` tag. Defaults to `false`.
 *
 * @returns The converted HTML string.
 */
export async function mdToHtml(
  md: string | undefined,
  inline?: boolean
): Promise<string | undefined>;
export async function mdToHtml(
  md: string | undefined,
  inline: boolean = false
): Promise<string | undefined> {
  if (md == null) {
    return undefined;
  }

  const rawHtml = inline
    ? markdown.renderInline(md)
    : await markdown.renderAsync(md);

  const safeHtml: string = sanitizeHtml(rawHtml, htmlSanitizeOptions);
  // Revert some escaped characters for comparison.
  if (comparableSanitizedHtml(rawHtml) === comparableSanitizedHtml(safeHtml)) {
    return adjustUrls(safeHtml);
  }

  console.debug('Rejected unsafe md:\n', md);
  console.error('Rejected unsafe html:\n', rawHtml);
  console.error('Clean unsafe html:\n', comparableSanitizedHtml(rawHtml));
  console.error('Clean safe html:\n', comparableSanitizedHtml(safeHtml));
  console.log('-'.repeat(80));
  throw new Error('Found unsafe html');
}

export function adjustUrls(description: string): string {
  return description.replaceAll(/https:\/\/(next.)?fakerjs.dev\//g, '/');
}
