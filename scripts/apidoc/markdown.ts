import sanitizeHtml from 'sanitize-html';
import type { MarkdownRenderer } from 'vitepress';
import { createMarkdownRenderer } from 'vitepress';
import vitepressConfig from '../../docs/.vitepress/config';
import { adjustUrls, pathOutputDir } from './utils';

let markdown: MarkdownRenderer;

export async function initMarkdownRenderer(): Promise<void> {
  markdown = await createMarkdownRenderer(
    pathOutputDir,
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
    pre: ['class', 'tabindex', 'v-pre'],
    span: ['class', 'style'],
  },
  selfClosing: [],
};

function comparableSanitizedHtml(html: string): string {
  return html
    .replace(/&gt;/g, '>')
    .replace(/ /g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Converts Markdown to an HTML string and sanitizes it.
 * @param md The markdown to convert.
 * @param inline Whether to render the markdown as inline, without a wrapping `<p>` tag. Defaults to `false`.
 * @returns The converted HTML string.
 */
export function mdToHtml(md: string, inline: boolean = false): string {
  const rawHtml = inline ? markdown.renderInline(md) : markdown.render(md);

  const safeHtml: string = sanitizeHtml(rawHtml, htmlSanitizeOptions);
  // Revert some escaped characters for comparison.
  if (comparableSanitizedHtml(rawHtml) === comparableSanitizedHtml(safeHtml)) {
    return adjustUrls(safeHtml);
  }

  console.debug('Rejected unsafe md:', md);
  console.error('Rejected unsafe html:', rawHtml);
  console.error('Rejected unsafe html:', comparableSanitizedHtml(rawHtml));
  console.error('Expected safe html:', comparableSanitizedHtml(safeHtml));
  throw new Error('Found unsafe html');
}
