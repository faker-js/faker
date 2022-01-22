import { describe, expect, it, vi } from 'vitest';
import { faker } from '../lib/cjs';

describe('system', () => {
  describe('directoryPath()', () => {
    it('returns unix fs directory full path', () => {
      const spy_random_words = vi
        .spyOn(faker.random, 'words')
        .mockReturnValue('24/7');

      const directoryPath = faker.system.directoryPath();

      expect(
        directoryPath.indexOf('/'),
        'generated directoryPath should start with /'
      ).toBe(0);

      spy_random_words.mockRestore();
    });
  });

  describe('filePath()', () => {
    it('returns unix fs file full path', () => {
      const spy_random_words = vi
        .spyOn(faker.random, 'words')
        .mockReturnValue('24/7');

      const filePath = faker.system.filePath();

      expect(
        filePath.indexOf('/'),
        'generated filePath should start with /'
      ).toBe(0);

      spy_random_words.mockRestore();
    });
  });

  describe('fileName()', () => {
    it('returns filenames without system path separators', () => {
      const spy_random_words = vi
        .spyOn(faker.random, 'words')
        .mockReturnValue('24/7');

      const fileName = faker.system.fileName();

      expect(
        fileName.indexOf('/'),
        'generated fileNames should not have path separators'
      ).toBe(-1);

      spy_random_words.mockRestore();
    });
  });

  describe('commonFileName()', () => {
    it('returns filenames without system path separators', () => {
      const spy_random_words = vi
        .spyOn(faker.random, 'words')
        .mockReturnValue('24/7');

      const fileName =
        // @ts-expect-error
        faker.system.commonFileName();

      expect(
        fileName.indexOf('/'),
        'generated commonFileNames should not have path separators'
      ).toBe(-1);

      spy_random_words.mockRestore();
    });
  });
});
