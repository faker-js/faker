import { beforeEach, describe, expect, it } from 'vitest';
import { faker, Faker } from '../src';

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
      Error('Options with at least one entry in locales must be provided')
    );
  });

  it('should throw error if no locales passed', () => {
    expect(
      () =>
        // @ts-expect-error: missing locales
        new Faker({})
    ).toThrow(
      Error(
        'At least one entry in locales must be provided in the locales parameter'
      )
    );
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
