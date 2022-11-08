import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('jewels', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'jewels', (t) => {
    t.itEach(
      'jewelsBrand',
      'jewelsModel',
      'jewelsCategory',
      'jewelsMaterial',
      'jewelsGender'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.jewels.jewelsBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.jewels?.brand).toContain(brand);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.jewels.jewelsCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.jewels?.category).toContain(category);
        });
      });

      describe('model()', () => {
        it('returns a random model', () => {
          const model = faker.jewels.jewelsModel();

          expect(model).toBeTruthy();
          expect(model).toBeTypeOf('string');
          expect(faker.definitions.jewels?.model).toContain(model);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.jewels.jewelsMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.jewels?.material).toContain(material);
        });
      });

      describe('gender()', () => {
        it('returns a random gender', () => {
          const gender = faker.jewels.jewelsGender();

          expect(gender).toBeTruthy();
          expect(gender).toBeTypeOf('string');
          expect(faker.definitions.jewels?.gender).toContain(gender);
        });
      });
    }
  });
});
