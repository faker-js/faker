import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('liquor', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'liquor', (t) => {
    t.itEach(
      'liquorName',
      'liquorBrand',
      'liquorCategory',
      'liquorDescription',
      'liquorOrigin',
      'liquorAlcoholicContent',
      'liquorSize'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.liquor.liquorName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.liquor?.name).toContain(name);
        });
      });

      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.liquor.liquorBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.liquor?.brand).toContain(brand);
        });
      });

      describe('category()', () => {
        it('returns a random type', () => {
          const category = faker.liquor.liquorCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.liquor?.category).toContain(category);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.liquor.liquorDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.liquor?.description).toContain(description);
        });
      });

      describe('origin()', () => {
        it('returns a random origin', () => {
          const origin = faker.liquor.liquorOrigin();

          expect(origin).toBeTruthy();
          expect(origin).toBeTypeOf('string');
        });
      });

      describe('alcoholicContent()', () => {
        it('returns a random alcoholic content', () => {
          const alcoholicContent = faker.liquor.liquorAlcoholicContent();

          expect(alcoholicContent).toBeTruthy();
          expect(alcoholicContent).toBeTypeOf('number');
          expect(alcoholicContent).toBeGreaterThanOrEqual(10);
          expect(alcoholicContent).toBeLessThanOrEqual(65);
        });
      });

      describe('size()', () => {
        it('returns a random size', () => {
          const size = faker.liquor.liquorSize();

          expect(size).toBeTruthy();
          expect(size).toBeTypeOf('string');
          expect(faker.definitions.liquor?.size).toContain(size);
        });
      });
    }
  });
});
