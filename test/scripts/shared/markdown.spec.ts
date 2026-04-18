import { beforeAll, describe, expect, it } from 'vitest';
import {
  codeGroupToHtml,
  initMarkdownRenderer,
} from '../../../scripts/shared/markdown';

describe('markdown', () => {
  beforeAll(async () => {
    await initMarkdownRenderer();
  });

  describe('codeGroupToHtml()', () => {
    it('renders a plain code block for a single example', async () => {
      const html = await codeGroupToHtml(['const a = 1;']);

      expect(html).toMatchSnapshot();
    });

    it('renders a tabbed code group with titles from leading comments', async () => {
      const html = await codeGroupToHtml([
        '// First title\nconst a = 1;',
        '// Second title\nconst b = 2;',
      ]);

      expect(html).toMatchSnapshot();
    });

    it('throws when a multi-example block is missing a title comment', async () => {
      await expect(
        codeGroupToHtml(['// First title\nconst a = 1;', 'const b = 2;'])
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });
});
