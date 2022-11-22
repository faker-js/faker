import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('furniture', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'furniture', (t) => {
    t.itEach(
      'furnitureName',
      'furnitureCategory',
      'furnitureStyle',
      'furnitureMaterial',
      'furnitureBrand',
      'furnitureColor'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.furniture.furnitureName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.furniture?.name).toContain(name);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.furniture.furnitureCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.furniture?.category).toContain(category);
        });
      });

      describe('style()', () => {
        it('returns a random style', () => {
          const style = faker.furniture.furnitureStyle();

          expect(style).toBeTruthy();
          expect(style).toBeTypeOf('string');
          expect(faker.definitions.furniture?.style).toContain(style);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.furniture.furnitureMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.furniture?.material).toContain(material);
        });
      });

      describe('color()', () => {
        it('returns a random sitting', () => {
          const color = faker.furniture.furnitureColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
