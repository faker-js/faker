import { describe, expect, it } from 'vitest';
import { faker } from '../src';
import allLocales from '../src/locales';
import './vitest-extensions';

// Remark: actual use of locales functionality is currently tested in all.functional.js test

describe('locale', () => {
  describe('setLocale()', () => {
    it('setLocale() changes faker.locale', () => {
      for (const locale in faker.locales) {
        faker.setLocale(locale);
        expect(faker.locale).toBe(locale);
      }
    });
  });

  function checkLocaleData(data: unknown) {
    if (Array.isArray(data)) {
      it('should not have duplicate entries', () => {
        expect(data).not.toContainDuplicates();
      });
    } else if (typeof data === 'object' && data != null) {
      for (const [nestedKey, nestedData] of Object.entries(data)) {
        describe(nestedKey, () => {
          checkLocaleData(nestedData);
        });
      }
    } else {
      it.skip(`primitives cannot be tested`);
    }
  }

  checkLocaleData(allLocales);
});
