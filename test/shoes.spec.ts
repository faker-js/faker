import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('shoes', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'shoes', (t) => {
    t.itEach(
      'shoesBrand',
      'shoesProductType',
      'shoesSize',
      'shoesStyle',
      'shoesMaterial',
      'shoesColor'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.shoes.shoesBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.shoes?.brand).toContain(brand);
        });
      });

      describe('productType()', () => {
        it('returns a random productType', () => {
          const productType = faker.shoes.shoesProductType();

          expect(productType).toBeTruthy();
          expect(productType).toBeTypeOf('string');
          expect(faker.definitions.shoes?.productType).toContain(productType);
        });
      });

      describe('size()', () => {
        it('returns a random size', () => {
          const size = faker.shoes.shoesSize();

          expect(size).toBeTruthy();
          expect(size).toBeTypeOf('string');
          expect(faker.definitions.shoes?.size).toContain(size);
        });
      });

      describe('style()', () => {
        it('returns a random style', () => {
          const style = faker.shoes.shoesStyle();

          expect(style).toBeTruthy();
          expect(style).toBeTypeOf('string');
          expect(faker.definitions.shoes?.style).toContain(style);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.shoes.shoesMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.shoes?.material).toContain(material);
        });
      });

      describe('color()', () => {
        it('returns a random color', () => {
          const color = faker.shoes.shoesColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
