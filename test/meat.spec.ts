import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('meat', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'meat', (t) => {
    t.itEach(
      'meatName',
      'meatDescription',
      'meatCut',
      'meatCategory',
      'meatOrigin'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return name', () => {
          const name = faker.meat.meatName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.meat?.name).toContain(name);
        });
      });

      describe('description()', () => {
        it('should return description', () => {
          const description = faker.meat.meatDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.meat?.description).toContain(description);
        });
      });

      describe('category()', () => {
        it('should return category', () => {
          const category = faker.meat.meatCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.meat?.category).toContain(category);
        });
      });

      describe('cut()', () => {
        it('should return cut', () => {
          const cut = faker.meat.meatCut();

          expect(cut).toBeTruthy();
          expect(cut).toBeTypeOf('string');
          expect(faker.definitions.meat?.cut).toContain(cut);
        });
      });

      describe('origin()', () => {
        it('returns a random origin', () => {
          const origin = faker.meat.meatOrigin();

          expect(origin).toBeTruthy();
          expect(origin).toBeTypeOf('string');
        });
      });
    }
  });
});
