import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('drink', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'drink', (t) => {
    t.itEach('drinkName', 'drinkDescription', 'drinkCategory', 'drinkOrigin');
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return name', () => {
          const name = faker.drink.drinkName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.drink?.name).toContain(name);
        });
      });

      describe('description()', () => {
        it('should return description', () => {
          const description = faker.drink.drinkDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.drink?.description).toContain(description);
        });
      });

      describe('category()', () => {
        it('should return category', () => {
          const category = faker.drink.drinkCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.drink?.category).toContain(category);
        });
      });

      describe('origin()', () => {
        it('returns a random origin', () => {
          const origin = faker.drink.drinkOrigin();

          expect(origin).toBeTruthy();
          expect(origin).toBeTypeOf('string');
        });
      });
    }
  });
});
