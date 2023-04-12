import type { SpyInstance } from 'vitest';
import { describe, expect, it, vi } from 'vitest';
import { Faker, faker } from '../src';
import { FakerError } from '../src/errors/faker-error';

describe('faker', () => {
  it('should throw error if no locales passed', () => {
    expect(() => new Faker({ locale: [] })).toThrow(
      new FakerError(
        'The locale option must contain at least one locale definition.'
      )
    );
  });

  it('should not log anything on startup', () => {
    const spies: SpyInstance[] = Object.keys(console)
      .filter((key) => typeof console[key] === 'function')
      .map((methodName) =>
        vi.spyOn(console, methodName as keyof typeof console)
      );

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('..').faker;

    new Faker({ locale: { metadata: { title: '' } } });

    for (const spy of spies) {
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    }
  });

  describe('rawDefinitions', () => {
    it('locale rawDefinition accessibility', () => {
      // Metadata
      expect(faker.rawDefinitions.metadata.title).toBeDefined();
      // Standard modules
      expect(faker.rawDefinitions.location?.city_name).toBeDefined();
      // Non-existing module
      expect(faker.rawDefinitions.missing).toBeUndefined();
      // Non-existing definition in a non-existing module
      expect(faker.definitions.missing?.missing).toBeUndefined();
      // Non-existing definition in an existing module
      expect(faker.rawDefinitions.location?.missing).toBeUndefined();
    });
  });

  describe('definitions', () => {
    it('locale definition accessibility', () => {
      // Metadata
      expect(faker.definitions.metadata.title).toBeDefined();
      // Standard modules
      expect(faker.definitions.location.city_name).toBeDefined();
      // Non-existing module
      expect(faker.definitions.missing).toBeDefined();
      // Non-existing definition in a non-existing module
      expect(() => faker.definitions.missing.missing).toThrow();
      // Non-existing definition in an existing module
      expect(() => faker.definitions.location.missing).toThrow();
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

      const num1 = faker.number.int();

      const newSeed = faker.seed(seed);
      const num2 = faker.number.int();

      expect(num1).toBe(num2);
      expect(newSeed).toBe(seed);

      const num3 = faker.number.int();
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

  describe('defaultRefDate', () => {
    it('should be a defined', () => {
      expect(faker.defaultRefDate).toBeDefined();
    });

    it('should be a date in the very recent past', () => {
      const start = Date.now();
      const refDate = faker.defaultRefDate().getTime();
      const end = Date.now();
      expect(refDate).toBeGreaterThanOrEqual(start);
      expect(refDate).toBeLessThanOrEqual(end);
    });
  });
});
