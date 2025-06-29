const { describe, expect, it, vi } = await import('vitest');
const { allLocales, SimpleFaker } = require('../dist/index.cjs');

describe('require (cjs)', () => {
  describe.each(
    Object.keys(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      allLocales
    )
  )('locale imports', (locale) => {
    it(`should be possible to directly require('@faker-js/faker/locale/${locale}')`, () => {
      const { faker } = require(`../dist/locale/${locale}.cjs`);

      expect(faker).toBeDefined();
      expect(faker.string.alpha()).toBeTypeOf('string');
      expect(faker.definitions.metadata.title).toBe(
        allLocales[locale].metadata?.title
      );
    });
  });

  describe('simpleFaker', () => {
    it('should not log anything on startup', () => {
      const spies = Object.keys(console)
        .filter(
          (key) =>
            // @ts-expect-error: cts cant use `as keyof typeof console`
            typeof console[key] === 'function'
        )
        .map((methodName) =>
          vi.spyOn(
            console,
            // @ts-expect-error: cts cant use `as keyof typeof console`
            methodName
          )
        );

      expect(require('..').simpleFaker).toBeDefined();

      expect(new SimpleFaker()).toBeDefined();

      for (const spy of spies) {
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
      }
    });
  });
});
