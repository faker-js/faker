import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('wardrobe', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'wardrobe', (t) => {
    t.itEach(
      'wardrobeBrand',
      'wardrobeName',
      'wardrobeCategory',
      'wardrobeStyle',
      'wardrobeMaterial',
      'wardrobeColor'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a brand', () => {
          const brand = faker.wardrobe.wardrobeBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.wardrobe?.brand).toContain(brand);
        });
      });

      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.wardrobe.wardrobeName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.wardrobe?.name).toContain(name);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.wardrobe.wardrobeCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.wardrobe?.category).toContain(category);
        });
      });

      describe('style()', () => {
        it('returns a random style', () => {
          const style = faker.wardrobe.wardrobeStyle();

          expect(style).toBeTruthy();
          expect(style).toBeTypeOf('string');
          expect(faker.definitions.wardrobe?.style).toContain(style);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.wardrobe.wardrobeMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.wardrobe?.material).toContain(material);
        });
      });

      describe('color()', () => {
        it('returns a random sitting', () => {
          const color = faker.wardrobe.wardrobeColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
