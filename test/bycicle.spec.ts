import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('bycicle', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'bycicle', (t) => {
    return t.itEach(
      'bycicleName',
      'bycicleBrand',
      'bycicleCategory',
      'bycicleDescription',
      'bycicleMaterial',
      'bycicleSize',
      'bycicleGender',
      'bycicleColor'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.bycicle.bycicleName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.bycicle?.name).toContain(name);
        });
      });

      describe('brand()', () => {
        it('returns a random brand', () => {
          const brand = faker.bycicle.bycicleBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.bycicle?.brand).toContain(brand);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.bycicle.bycicleCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.bycicle?.category).toContain(category);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.bycicle.bycicleDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.bycicle?.description).toContain(description);
        });
      });

      describe('material()', () => {
        it('returns a random style', () => {
          const material = faker.bycicle.bycicleMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.bycicle?.material).toContain(material);
        });
      });

      describe('size()', () => {
        it('returns a random size', () => {
          const size = faker.bycicle.bycicleSize();

          expect(size).toBeTruthy();
          expect(size).toBeTypeOf('string');
          expect(faker.definitions.bycicle?.size).toContain(size);
        });
      });

      describe('gender()', () => {
        it('returns a random gender', () => {
          const gender = faker.bycicle.bycicleGender();

          expect(gender).toBeTruthy();
          expect(gender).toBeTypeOf('string');
          expect(faker.definitions.bycicle?.gender).toContain(gender);
        });
      });

      describe('color()', () => {
        it('returns a random sitting', () => {
          const color = faker.bycicle.bycicleColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
