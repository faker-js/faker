import { describe, expect, it } from 'vitest';
import allLocales from '../src/locales';

describe('locale imports', () => {
  for (const locale in allLocales) {
    it(`should be possible to directly require('@faker-js/faker/locale/${locale}')`, () => {
      const faker = require(`../dist/cjs/locale/${locale}`);

      expect(faker).toBeDefined();
      expect(faker.locale).toBe(locale);
    });
  }
});
