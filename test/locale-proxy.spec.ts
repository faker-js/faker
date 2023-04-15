import { describe, expect, it } from 'vitest';
import type { MetadataDefinitions } from '../src';
import { en, FakerError } from '../src';
import { createLocaleProxy } from '../src/locale-proxy';

describe('LocaleAccess', () => {
  const locale = createLocaleProxy(en);

  describe('category', () => {
    it('should be possible to check for a missing category', () => {
      expect('category' in locale).toBe(true);
    });

    it('should be possible to check for an existing category', () => {
      expect('airline' in locale).toBe(true);
    });

    it('should be possible to access the title', () => {
      expect(locale.metadata.title).toBe('English');
    });

    it('should be possible to access a missing category', () => {
      expect(locale.category).toBeDefined();
    });

    it('should not be possible to add a new category', () => {
      expect(() => {
        // @ts-expect-error LocaleAccess is read-only.
        locale.category = {};
      }).toThrowError(new FakerError('LocaleAccess is read-only.'));
    });

    it('should not be possible to replace a category', () => {
      expect(() => {
        // @ts-expect-error LocaleAccess is read-only.
        locale.airline = {};
      }).toThrowError(new FakerError('LocaleAccess is read-only.'));
    });

    it('should not be possible to delete a missing category', () => {
      expect(() => {
        // @ts-expect-error LocaleAccess is read-only.
        delete locale.category;
      }).toThrowError(new FakerError('LocaleAccess is read-only.'));
    });

    it('should not be possible to delete an existing category', () => {
      expect(() => {
        // @ts-expect-error LocaleAccess is read-only.
        delete locale.airline;
      }).toThrowError(new FakerError('LocaleAccess is read-only.'));
    });
  });

  describe('entry', () => {
    it('should be possible to check for a missing entry in a missing category', () => {
      expect('missing' in locale.category).toBe(false);
    });

    it('should be possible to check for a missing entry in a present category', () => {
      expect('missing' in locale.airline).toBe(false);
    });

    it('should be possible to check for a present entry', () => {
      expect('airline' in locale.airline).toBe(true);
    });

    it('should not be possible to access a missing entry in a missing category', () => {
      expect(() => locale.category.missing).toThrowError(
        new FakerError(
          `The locale data for 'category.missing' are missing in this locale.
  Please contribute the missing data to the project or use a locale/Faker instance that has these data.
  For more information see https://next.fakerjs.dev/guide/localization.html`
        )
      );
    });

    it('should not be possible to access a missing entry in a present category', () => {
      expect(() => locale.airline.missing).toThrowError(
        new FakerError(
          `The locale data for 'airline.missing' are missing in this locale.
  Please contribute the missing data to the project or use a locale/Faker instance that has these data.
  For more information see https://next.fakerjs.dev/guide/localization.html`
        )
      );
    });

    it('should be possible to access a present entry', () => {
      expect(locale.airline.airline).toBeDefined();
    });

    it('should not be possible to access an unavailable entry in a present category', () => {
      const unavailable = createLocaleProxy({
        metadata: {} as MetadataDefinitions,
        airline: { airline: [] },
      });

      expect(() => unavailable.airline.airline).toThrowError(
        new FakerError(
          `The locale data for 'airline.airline' aren't applicable to this locale.
  If you think this is a bug, please report it at: https://github.com/faker-js/faker`
        )
      );
    });

    it('should not be possible to add a new entry in a missing category', () => {
      expect(() => {
        // @ts-expect-error LocaleAccess is read-only.
        locale.category.missing = {};
      }).toThrowError(new FakerError('LocaleAccess is read-only.'));
    });

    it('should not be possible to add a new entry in an existing category', () => {
      expect(() => {
        // @ts-expect-error LocaleAccess is read-only.
        locale.airline.missing = {};
      }).toThrowError(new FakerError('LocaleAccess is read-only.'));
    });

    it('should not be possible to replace an entry in an existing category', () => {
      expect(() => {
        // @ts-expect-error LocaleAccess is read-only.
        locale.airline.airline = [];
      }).toThrowError(new FakerError('LocaleAccess is read-only.'));
    });

    it('should not be possible to delete a missing entry in a missing category', () => {
      expect(() => {
        // @ts-expect-error LocaleAccess is read-only.
        delete locale.category.missing;
      }).toThrowError(new FakerError('LocaleAccess is read-only.'));
    });

    it('should not be possible to delete a missing entry in an existing category', () => {
      expect(() => {
        // @ts-expect-error LocaleAccess is read-only.
        delete locale.airline.missing;
      }).toThrowError(new FakerError('LocaleAccess is read-only.'));
    });

    it('should not be possible to delete an existing entry in an existing category', () => {
      expect(() => {
        // @ts-expect-error LocaleAccess is read-only.
        delete locale.airline.airline;
      }).toThrowError(new FakerError('LocaleAccess is read-only.'));
    });
  });
});
