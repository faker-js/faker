import { describe, expect, it } from 'vitest';
import allLocales from '../src/locales';

describe('locale imports', () => {
  for (const localeName in allLocales) {
    it(`should be possible to directly require('@faker-js/faker/locale/${localeName}')`, () => {
      const {
        faker,
        default: locale,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
      } = require(`../dist/cjs/locale/${localeName}`);

      expect(faker).toBeDefined();
      expect(locale).toBeDefined();
      expect(faker.locale).toBe(localeName);
    });

    it(`should be possible to directly import('@faker-js/faker/locale/${localeName}')`, async () => {
      const {
        faker,
        default: locale,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
      } = await import(`../dist/esm/locale/${localeName}`);

      expect(faker).toBeDefined();
      expect(locale).toBeDefined();
      expect(faker.locale).toBe(localeName);
    });

    describe('Internal tests to cover `src/locale/*.ts`', () => {
      it(`should be possible to directly require('../locale/${localeName}')`, () => {
        const {
          faker,
          default: locale,
          // eslint-disable-next-line @typescript-eslint/no-var-requires
        } = require(`../locale/${localeName}`);

        expect(faker).toBeDefined();
        expect(locale).toBeDefined();
        expect(faker.locale).toBe(localeName);
      });

      it(`should be possible to directly import('../src/locale/${localeName}')`, async () => {
        const {
          faker,
          default: locale,
          // eslint-disable-next-line @typescript-eslint/no-var-requires
        } = await import(`../src/locale/${localeName}`);

        expect(faker).toBeDefined();
        expect(locale).toBeDefined();
        expect(faker.locale).toBe(localeName);
      });
    });
  }
});
