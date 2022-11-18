import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('smokingRollingPaper', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'smokingRollingPaper', (t) => {
    t.itEach(
      'smokingRollingPaperBrand',
      'smokingRollingPaperColor',
      'smokingRollingPaperSize'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.smokingRollingPaper.smokingRollingPaperBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.smokingRollingPaper?.brand).toContain(brand);
        });
      });

      describe('color()', () => {
        it('returns a random color', () => {
          const color = faker.smokingRollingPaper.smokingRollingPaperColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });

      describe('size()', () => {
        it('returns a random size', () => {
          const size = faker.smokingRollingPaper.smokingRollingPaperSize();

          expect(size).toBeTruthy();
          expect(size).toBeTypeOf('string');
          expect(faker.definitions.smokingRollingPaper?.size).toContain(size);
        });
      });
    }
  });
});
