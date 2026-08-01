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
      const html = await codeGroupToHtml(['const a = 1;'], 'single');

      expect(html).toMatchSnapshot();
    });

    it('renders a tabbed code group with titles from leading comments', async () => {
      const html = await codeGroupToHtml(
        ['// First title\nconst a = 1;', '// Second title\nconst b = 2;'],
        'example'
      );

      expect(html).toMatchSnapshot();
    });

    it('scopes tab controls to their code group', async () => {
      const codes = [
        '// First title\nconst attributes = \'id="tab-custom" name="group-custom" for="tab-custom"\';',
        '// Second title\nconst b = 2;',
      ];

      const first = await codeGroupToHtml(codes, 'first');
      const second = await codeGroupToHtml(codes, 'second');

      // the generated tab controls are prefixed with the code group id
      expect(first).toContain('name="first-group-0"');
      expect(first).toContain('id="first-tab-1"');
      expect(first).toContain('for="first-tab-1"');
      expect(second).toContain('name="second-group-0"');
      expect(second).toContain('id="second-tab-1"');
      expect(second).toContain('for="second-tab-1"');

      // while identical looking attributes inside the code examples are kept as is
      expect(first).toContain('id="tab-custom"');
      expect(first).toContain('name="group-custom"');
      expect(first).toContain('for="tab-custom"');
    });

    it('rejects an unsafe code group identifier', async () => {
      await expect(
        codeGroupToHtml(
          ['// First title\nconst a = 1;', '// Second title\nconst b = 2;'],
          'unsafe" onclick="alert(1)'
        )
      ).rejects.toThrow('Code group identifier must start with a letter');
    });

    it('throws when a multi-example block is missing a title comment', async () => {
      await expect(
        codeGroupToHtml(
          ['// First title\nconst a = 1;', 'const b = 2;'],
          'missing-title'
        )
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });
});
