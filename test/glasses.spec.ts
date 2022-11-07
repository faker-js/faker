import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('glasses', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'glasses', (t) => {
    t.itEach(
      'glassesBrand',
      'glassesProductType',
      'glassesSize',
      'glassesMaterial',
      'glassesColor',
      'glassesGender',
      'glassesShape',
      'glassesLensType'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.glasses.glassesBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.glasses?.brand).toContain(brand);
        });
      });

      describe('productType()', () => {
        it('returns a random productType', () => {
          const productType = faker.glasses.glassesProductType();

          expect(productType).toBeTruthy();
          expect(productType).toBeTypeOf('string');
          expect(faker.definitions.glasses?.productType).toContain(productType);
        });
      });

      describe('size()', () => {
        it('returns a random size', () => {
          const size = faker.glasses.glassesSize();

          expect(size).toBeTruthy();
          expect(size).toBeTypeOf('string');
          expect(faker.definitions.glasses?.size).toContain(size);
        });
      });

      describe('gender()', () => {
        it('returns a random gender', () => {
          const gender = faker.glasses.glassesGender();

          expect(gender).toBeTruthy();
          expect(gender).toBeTypeOf('string');
          expect(faker.definitions.glasses?.gender).toContain(gender);
        });
      });

      describe('shape()', () => {
        it('returns a random shape', () => {
          const shape = faker.glasses.glassesShape();

          expect(shape).toBeTruthy();
          expect(shape).toBeTypeOf('string');
          expect(faker.definitions.glasses?.shape).toContain(shape);
        });
      });

      describe('lensType()', () => {
        it('returns a random lensType', () => {
          const lensType = faker.glasses.glassesLensType();

          expect(lensType).toBeTruthy();
          expect(lensType).toBeTypeOf('string');
          expect(faker.definitions.glasses?.lensType).toContain(lensType);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.glasses.glassesMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.glasses?.material).toContain(material);
        });
      });

      describe('color()', () => {
        it('returns a random color', () => {
          const color = faker.glasses.glassesColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
