import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('tire', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'tire', (t) => {
    t.itEach(
      'tireBrand',
      'tireName',
      'tireSeason',
      'tireDiameter',
      'tireWidth',
      'tireHeight'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.tire.tireBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.tire?.brand).toContain(brand);
        });
      });

      describe('name()', () => {
        it('returns a random name', () => {
          const name = faker.tire.tireName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.tire?.name).toContain(name);
        });
      });

      describe('season()', () => {
        it('returns a random season', () => {
          const season = faker.tire.tireSeason();

          expect(season).toBeTruthy();
          expect(season).toBeTypeOf('string');
          expect(faker.definitions.tire?.season).toContain(season);
        });
      });

      describe('diameter()', () => {
        it('returns a random diameter', () => {
          const diameter = faker.tire.tireDiameter();

          expect(diameter).toBeTruthy();
          expect(diameter).toBeTypeOf('number');
          expect(diameter).toBeGreaterThanOrEqual(16);
          expect(diameter).toBeLessThanOrEqual(19);
        });
      });

      describe('width()', () => {
        it('returns a random width', () => {
          const width = faker.tire.tireWidth();

          expect(width).toBeTruthy();
          expect(width).toBeTypeOf('number');
          expect(width).toBeGreaterThanOrEqual(10);
          expect(width).toBeLessThanOrEqual(500);
        });
      });

      describe('height()', () => {
        it('returns a random height', () => {
          const height = faker.tire.tireHeight();

          expect(height).toBeTruthy();
          expect(height).toBeTypeOf('number');
          expect(height).toBeGreaterThanOrEqual(35);
          expect(height).toBeLessThanOrEqual(75);
        });
      });
    }
  });
});
