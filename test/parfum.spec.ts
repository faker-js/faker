import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('parfum', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'parfum', (t) => {
    t.itEach(
      'parfumBrand',
      'parfumModel',
      'parfumCategory',
      'parfumCapacity',
      'parfumSize',
      'parfumDescription',
      'parfumComposition',
      'parfumGender'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a random brand', () => {
          const brand = faker.parfum.parfumBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.parfum?.brand).toContain(brand);
        });
      });

      describe('model()', () => {
        it('returns a random model', () => {
          const model = faker.parfum.parfumModel();

          expect(model).toBeTruthy();
          expect(model).toBeTypeOf('string');
          expect(faker.definitions.parfum?.model).toContain(model);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.parfum.parfumCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.parfum?.category).toContain(category);
        });
      });

      describe('capacity()', () => {
        it('returns a random capacity', () => {
          const capacity = faker.parfum.parfumCapacity();

          expect(capacity).toBeTruthy();
          expect(capacity).toBeTypeOf('string');
          expect(faker.definitions.parfum?.capacity).toContain(capacity);
        });
      });

      describe('size()', () => {
        it('returns a random size', () => {
          const size = faker.parfum.parfumSize();

          expect(size).toBeTruthy();
          expect(size).toBeTypeOf('string');
          expect(faker.definitions.parfum?.size).toContain(size);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.parfum.parfumDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.parfum?.description).toContain(description);
        });
      });

      describe('composition()', () => {
        it('returns a random composition', () => {
          const composition = faker.parfum.parfumComposition();

          expect(composition).toBeTruthy();
          expect(composition).toBeTypeOf('string');
          expect(faker.definitions.parfum?.composition).toContain(composition);
        });
      });

      describe('gender()', () => {
        it('returns a random gender', () => {
          const gender = faker.parfum.parfumGender();

          expect(gender).toBeTruthy();
          expect(gender).toBeTypeOf('string');
          expect(faker.definitions.parfum?.gender).toContain(gender);
        });
      });
    }
  });
});
