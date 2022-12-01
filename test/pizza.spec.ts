import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('pizza', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'pizza', (t) => {
    t.itEach(
      'pizzaName',
      'pizzaDescription',
      'pizzaCategory',
      'pizzaIngredients',
      'pizzaPreparation'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.pizza.pizzaName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.pizza?.name).toContain(name);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.pizza.pizzaDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.pizza?.description).toContain(description);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.pizza.pizzaCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.pizza?.category).toContain(category);
        });
      });

      describe('ingredients()', () => {
        it('returns a random ingredients', () => {
          const ingredients = faker.pizza.pizzaIngredients();

          expect(ingredients).toBeTruthy();
          expect(ingredients).toBeTypeOf('string');
          expect(faker.definitions.pizza?.ingredients).toContain(ingredients);
        });
      });

      describe('preparation()', () => {
        it('returns a random preparation', () => {
          const preparation = faker.pizza.pizzaPreparation();

          expect(preparation).toBeTruthy();
          expect(preparation).toBeTypeOf('string');
          expect(faker.definitions.pizza?.preparation).toContain(preparation);
        });
      });
    }
  });
});
