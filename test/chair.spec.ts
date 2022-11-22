import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('chair', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'chair', (t) => {
    t.itEach(
      'chairName',
      'chairCategory',
      'chairStyle',
      'chairMaterial',
      'chairColor'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.chair.chairName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.chair?.name).toContain(name);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.chair.chairCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.chair?.category).toContain(category);
        });
      });

      describe('style()', () => {
        it('returns a random style', () => {
          const style = faker.chair.chairStyle();

          expect(style).toBeTruthy();
          expect(style).toBeTypeOf('string');
          expect(faker.definitions.chair?.style).toContain(style);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.chair.chairMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.chair?.material).toContain(material);
        });
      });

      describe('color()', () => {
        it('returns a random sitting', () => {
          const color = faker.chair.chairColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
