import { describe, expect, it } from 'vitest';
import { faker } from '../lib/cjs';

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
});
