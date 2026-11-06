import { describe, expect, it, vi } from 'vitest';
import { Faker, createFakerCore, en } from '../../src';
import { getFakerForCore } from '../../src/internal/faker-for-core';
import { fakePersonLastName } from '../../src/modules/person';

describe('internal', () => {
  describe('getFakerForCore', () => {
    it('should return the same instance for the same core', () => {
      const fakerCore = createFakerCore({ locale: en });

      expect(getFakerForCore(fakerCore)).toBe(getFakerForCore(fakerCore));
    });

    it('should return different instances for different cores', () => {
      const fakerCore1 = createFakerCore({ locale: en });
      const fakerCore2 = createFakerCore({ locale: en });

      expect(getFakerForCore(fakerCore1)).not.toBe(getFakerForCore(fakerCore2));
    });

    it('should share the randomizer and locale of the core', () => {
      const fakerCore = createFakerCore({ locale: en });
      const faker = getFakerForCore(fakerCore);

      expect(faker.fakerCore.randomizer).toBe(fakerCore.randomizer);
      expect(faker.fakerCore.locale).toBe(fakerCore.locale);
      expect(faker.fakerCore.config).toBe(fakerCore.config);
    });

    it('should generate the same values as a fresh Faker', () => {
      const pattern = '{{person.lastName}} {{location.city}}';
      const fakerCore = createFakerCore({ locale: en, seed: 42 });
      const expected = [1, 2, 3].map(() =>
        new Faker(fakerCore).helpers.fake(pattern)
      );

      fakerCore.randomizer.seed(42);
      const actual = [1, 2, 3].map(() =>
        getFakerForCore(fakerCore).helpers.fake(pattern)
      );

      expect(actual).toEqual(expected);
    });

    it('should be used by standalone functions', () => {
      const fakerCore = createFakerCore({ locale: en });
      const fake = vi.fn<() => string>(() => 'cached');
      getFakerForCore(fakerCore).helpers.fake = fake;

      expect(fakePersonLastName(fakerCore)).toBe('cached');
      expect(fakePersonLastName(fakerCore)).toBe('cached');
      expect(fake).toHaveBeenCalledTimes(2);
    });
  });
});
