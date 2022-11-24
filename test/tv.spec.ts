import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('tv', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'tv', (t) => {
    t.itEach(
      'tvName',
      'tvBrand',
      'tvSize',
      'tvColor',
      'tvCategory',
      'tvDescription'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.tv.tvName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.tv?.name).toContain(name);
        });
      });

      describe('brand()', () => {
        it('returns a random brand', () => {
          const brand = faker.tv.tvBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.tv?.brand).toContain(brand);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.tv.tvCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.tv?.category).toContain(category);
        });
      });

      describe('description()', () => {
        it('returns a random tvry', () => {
          const description = faker.tv.tvDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.tv?.description).toContain(description);
        });
      });

      describe('size()', () => {
        it('returns a random size', () => {
          const size = faker.tv.tvSize();

          expect(size).toBeTruthy();
          expect(size).toBeTypeOf('string');
          expect(faker.definitions.tv?.size).toContain(size);
        });
      });

      describe('color()', () => {
        it('returns a random color', () => {
          const color = faker.tv.tvColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
