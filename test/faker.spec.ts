import type { SpyInstance } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { faker, Faker } from '../src';
import { FakerError } from '../src/errors/faker-error';

describe('faker', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  it('should throw error if no options passed', () => {
    expect(
      () =>
        // @ts-expect-error: mission options
        new Faker()
    ).toThrow(
      new FakerError(
        'Options with at least one entry in locales must be provided'
      )
    );
  });

  it('should throw error if no locales passed', () => {
    expect(
      () =>
        // @ts-expect-error: missing locales
        new Faker({})
    ).toThrow(
      new FakerError(
        'At least one entry in locales must be provided in the locales parameter'
      )
    );
  });

  it('should throw error if locale is not known', () => {
    const instance = new Faker({ locales: { en: { title: 'English' } } });
    expect(() => (instance.locale = 'unknown')).toThrow(
      new FakerError(
        'Locale unknown is not supported. You might want to add the requested locale first to `faker.locales`.'
      )
    );
  });

  it('should throw error if localeFallback is not known', () => {
    const instance = new Faker({ locales: { en: { title: 'English' } } });
    expect(() => (instance.localeFallback = 'unknown')).toThrow(
      new FakerError(
        'Locale unknown is not supported. You might want to add the requested locale first to `faker.locales`.'
      )
    );
  });

  it('should not log anything on startup', () => {
    const spies: Array<SpyInstance> = Object.keys(console)
      .filter((key) => typeof console[key] === 'function')
      .map((methodName) =>
        vi.spyOn(console, methodName as keyof typeof console)
      );

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('..').faker;

    new Faker({ locales: { en: { title: '' } } });

    for (const spy of spies) {
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    }
  });

  describe('definitions', () => {
    describe('title', () => {
      it.each(Object.keys(faker.locales))('title (%s)', (locale) => {
        faker.locale = locale;
        expect(faker.definitions.title).toBe(faker.locales[locale].title);
      });
    });

    describe('separator', () => {
      it.each(Object.keys(faker.locales))('separator (%s)', (locale) => {
        faker.locale = locale;
        expect(faker.definitions.separator).toBeTypeOf('string');
      });

      it('separator (with fallback)', () => {
        // Use a language that doesn't have a separator specified
        expect(faker.locales['en_US'].separator).toBeUndefined();
        // Check that the fallback works
        expect(faker.definitions.separator).toBe(faker.locales['en'].separator);
      });
    });

    it('locale definition accessability', () => {
      // Metadata
      expect(faker.definitions.title).toBeDefined();
      // Standard modules
      expect(faker.definitions.address.city_name).toBeDefined();
      // Custom modules
      expect(faker.definitions.business.credit_card_types).toBeDefined();
      expect(faker.definitions.missing).toBeUndefined();
      expect(faker.definitions.business.missing).toBeUndefined();
    });
  });

  // This is only here for coverage
  // The actual test is in mersenne.spec.ts
  describe('seed()', () => {
    it('seed()', () => {
      const seed = faker.seed();

      expect(seed).toBeDefined();
      expect(seed).toBeTypeOf('number');
    });

    it('should reset the sequence when calling `seed`', () => {
      const seed = faker.seed();

      const num1 = faker.datatype.number();

      const newSeed = faker.seed(seed);
      const num2 = faker.datatype.number();

      expect(num1).toBe(num2);
      expect(newSeed).toBe(seed);

      const num3 = faker.datatype.number();
      expect(num1).not.toBe(num3);
    });

    it('seed(number)', () => {
      faker.seed(1);

      const actual = faker.animal.cat();
      expect(actual).toBe('Korat');
    });

    it('seed(number[])', () => {
      faker.seed([1, 2, 3]);

      const actual = faker.animal.cat();
      expect(actual).toBe('Oriental');
    });
  });
});
