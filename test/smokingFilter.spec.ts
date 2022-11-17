import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('smokingFilter', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'smokingFilter', (t) => {
    t.itEach('smokingFilterBrand', 'smokingFilterSize');
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.smokingFilter.smokingFilterBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.smokingFilter?.brand).toContain(brand);
        });
      });

      describe('size()', () => {
        it('returns a random size', () => {
          const size = faker.smokingFilter.smokingFilterSize();

          expect(size).toBeTruthy();
          expect(size).toBeTypeOf('string');
          expect(faker.definitions.smokingFilter?.size).toContain(size);
        });
      });
    }
  });
});
