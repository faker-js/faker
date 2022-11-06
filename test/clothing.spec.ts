import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('clothing', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'clothing', (t) => {
    t.itEach(
      'clothingBrand',
      'clothingProductType',
      'clothingSize',
      'clothingStyle',
      'clothingMaterial',
      'clothingColor'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.clothing.clothingBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.clothing?.brand).toContain(brand);
        });
      });

      describe('productType()', () => {
        it('returns a random productType', () => {
          const productType = faker.clothing.clothingProductType();

          expect(productType).toBeTruthy();
          expect(productType).toBeTypeOf('string');
          expect(faker.definitions.clothing?.productType).toContain(
            productType
          );
        });
      });

      describe('size()', () => {
        it('returns a random size', () => {
          const size = faker.clothing.clothingSize();

          expect(size).toBeTruthy();
          expect(size).toBeTypeOf('string');
          expect(faker.definitions.clothing?.size).toContain(size);
        });
      });

      describe('style()', () => {
        it('returns a random style', () => {
          const style = faker.clothing.clothingStyle();

          expect(style).toBeTruthy();
          expect(style).toBeTypeOf('string');
          expect(faker.definitions.clothing?.style).toContain(style);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.clothing.clothingMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.clothing?.material).toContain(material);
        });
      });

      describe('color()', () => {
        it('returns a random color', () => {
          const color = faker.clothing.clothingColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
