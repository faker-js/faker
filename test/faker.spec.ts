import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

describe('faker', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

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

  // This is only here for coverage
  // The actual test is in mersenne.spec.ts
  describe('seed()', () => {
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
