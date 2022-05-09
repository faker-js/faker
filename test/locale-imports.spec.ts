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

    it(`should be possible to directly import('@faker-js/faker/locale/${locale}')`, async () => {
      const { faker } = await import(`../dist/esm/locale/${locale}`);

      expect(faker).toBeDefined();
      expect(faker.locale).toBe(locale);
    });

    describe('Internal tests to cover `src/locale/*.ts`', () => {
      it(`should be possible to directly require('../locale/${locale}')`, () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { faker } = require(`../locale/${locale}`);

        expect(faker).toBeDefined();
        expect(faker.locale).toBe(locale);
      });

      it(`should be possible to directly import('../src/locale/${locale}')`, async () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { faker } = await import(`../src/locale/${locale}`);

        expect(faker).toBeDefined();
        expect(faker.locale).toBe(locale);
      });
    });
  }
});
