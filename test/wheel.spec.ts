import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('wheel', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'wheel', (t) => {
    t.itEach(
      'wheelBrand',
      'wheelName',
      'wheelMaterial',
      'wheelDiameter',
      'wheelWidth',
      'wheelHeight'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.wheel.wheelBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.wheel?.brand).toContain(brand);
        });
      });

      describe('name()', () => {
        it('returns a random name', () => {
          const name = faker.wheel.wheelName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.wheel?.name).toContain(name);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.wheel.wheelMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.wheel?.material).toContain(material);
        });
      });

      describe('diameter()', () => {
        it('returns a random diameter', () => {
          const diameter = faker.wheel.wheelDiameter();

          expect(diameter).toBeTruthy();
          expect(diameter).toBeTypeOf('number');
          expect(diameter).toBeGreaterThanOrEqual(16);
          expect(diameter).toBeLessThanOrEqual(19);
        });
      });

      describe('width()', () => {
        it('returns a random width', () => {
          const width = faker.wheel.wheelWidth();

          expect(width).toBeTruthy();
          expect(width).toBeTypeOf('number');
          expect(width).toBeGreaterThanOrEqual(10);
          expect(width).toBeLessThanOrEqual(500);
        });
      });

      describe('height()', () => {
        it('returns a random height', () => {
          const height = faker.wheel.wheelHeight();

          expect(height).toBeTruthy();
          expect(height).toBeTypeOf('number');
          expect(height).toBeGreaterThanOrEqual(35);
          expect(height).toBeLessThanOrEqual(75);
        });
      });
    }
  });
});
