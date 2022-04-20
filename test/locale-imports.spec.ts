import { describe, expect, it } from 'vitest';
import allLocales from '../src/locales';

describe('locale imports', () => {
  for (const locale in allLocales) {
    it(`should be possible to directly require('@faker-js/faker/locale/${locale}')`, () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { faker } = require(`../dist/cjs/locale/${locale}`);

      expect(faker).toBeDefined();
      expect(faker.locale).toBe(locale);
    });

    // Internal test to cover `src/locale/*.ts`
    it(`should be possible to directly require('../locale/${locale}')`, () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { faker } = require(`../locale/${locale}`);

      expect(faker).toBeDefined();
      expect(faker.locale).toBe(locale);
    });
  }
});
