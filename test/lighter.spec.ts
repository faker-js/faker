import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('lighter', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'lighter', (t) => {
    t.itEach('lighterBrand', 'lighterMaterial', 'lighterColor');
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.lighter.lighterBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.lighter?.brand).toContain(brand);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.lighter.lighterMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.lighter?.material).toContain(material);
        });
      });

      describe('color()', () => {
        it('returns a random color', () => {
          const color = faker.lighter.lighterColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
