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

      expect(html).not.toContain('vp-code-group');
      expect(html).toContain('const');
    });

    it('renders a tabbed code group with titles from leading comments', async () => {
      const html = await codeGroupToHtml([
        '// First title\nconst a = 1;',
        '// Second title\nconst b = 2;',
      ]);

      expect(html).toContain('vp-code-group');
      expect(html).toContain('First title');
      expect(html).toContain('Second title');
      // The leading title comment should be stripped from the rendered code body
      // since the tab label already displays it.
      expect(html).not.toContain('// First title');
      expect(html).not.toContain('// Second title');
    });

    it('throws when a multi-example block is missing a title comment', async () => {
      await expect(
        codeGroupToHtml(['// First title\nconst a = 1;', 'const b = 2;'])
      ).rejects.toThrow(
        /Example 2 in a multi-example block must start with a `\/\/ Title` line comment/
      );
    });
  });
});
