import sanitizeHtml from 'sanitize-html';
import type { MarkdownRenderer } from 'vitepress';
import { createMarkdownRenderer } from 'vitepress';
import vitepressConfig from '../../docs/.vitepress/config';
import { FILE_PATH_API_DOCS } from './paths';

let markdown: MarkdownRenderer;

export async function initMarkdownRenderer(): Promise<void> {
  // eslint-disable-next-line unicorn/no-top-level-assignment-in-function
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
    'input',
    'label',
    'li',
    'p',
    'pre',
    'span',
    'strong',
    'ul',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    button: ['class', 'title'],
    div: ['class'],
    input: ['type', 'name', 'id', 'checked'],
    label: ['for', 'data-title'],
    pre: ['class', 'dir', 'style', 'v-pre', 'tabindex'],
    span: ['class', 'style'],
    table: ['tabindex'],
    th: ['style'],
    td: ['style'],
  },
  selfClosing: ['input'],
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
    .replaceAll('/>', '>')
    .replaceAll(' ', '');
}

/**
 * Wraps the given code in a markdown code block.
 *
 * @param code The code to wrap.
 *
 * @returns The wrapped code.
 */
export function wrapCode(code: string): string {
  const delimiter = '```';
  return `${delimiter}ts\n${code}\n${delimiter}`;
}

/**
 * Converts a Typescript code block to an HTML string and sanitizes it.
 *
 * @param code The code to convert.
 *
 * @returns The converted HTML string.
 */
export async function codeToHtml(code: string): Promise<string> {
  return mdToHtml(wrapCode(code));
}

/**
 * Converts a list of Typescript code blocks to a tabbed VitePress code group
 * and returns the rendered, sanitized HTML.
 *
 * If only a single code block is provided, a plain code block is rendered
 * instead so we don't emit an unnecessary tab strip.
 *
 * When multiple code blocks are provided, each block's first line must be a
 * single-line `//` comment that is used as the tab title. This keeps the tab
 * titles visible in JSDoc-driven IDE tooltips without introducing any
 * docs-site-only metadata in the source.
 *
 * @param codes The code blocks to convert.
 *
 * @returns The converted HTML string.
 */
export async function codeGroupToHtml(codes: string[]): Promise<string> {
  if (codes.length <= 1) {
    return codeToHtml(codes.join('\n'));
  }

  const delimiter = '```';
  const blocks = codes
    .map((code, index) => {
      const { title, body } = extractCodeGroupTitle(code, index);
      return `${delimiter}ts [${title}]\n${body}\n${delimiter}`;
    })
    .join('\n\n');
  return mdToHtml(`::: code-group\n\n${blocks}\n\n:::`);
}

function extractCodeGroupTitle(
  code: string,
  index: number
): { title: string; body: string } {
  const newlineIndex = code.indexOf('\n');
  const firstLine = newlineIndex === -1 ? '' : code.slice(0, newlineIndex);
  if (!firstLine.startsWith('// ')) {
    throw new Error(
      `Example ${index + 1} in a multi-example block must start with a \`// Title\` line comment to label the code-group tab, but got:\n${code}`
    );
  }

  const body = code.slice(newlineIndex + 1);

  return { title: firstLine.substring(3), body };
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
