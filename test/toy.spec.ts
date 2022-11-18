import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('toy', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'toy', (t) => {
    t.itEach('toyName', 'toyBrand', 'toyCategory', 'toyDescription', 'toyAge');
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.toy.toyName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.toy?.name).toContain(name);
        });
      });

      describe('brand()', () => {
        it('returns a random brand', () => {
          const brand = faker.toy.toyBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.toy?.brand).toContain(brand);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.toy.toyCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.toy?.category).toContain(category);
        });
      });

      describe('description()', () => {
        it('returns a random toyry', () => {
          const description = faker.toy.toyDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.toy?.description).toContain(description);
        });
      });

      describe('age()', () => {
        it('returns a random age', () => {
          const age = faker.toy.toyAge();

          expect(age).toBeTruthy();
          expect(age).toBeTypeOf('string');
        });
      });
    }
  });
});
