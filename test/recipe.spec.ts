import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('recipe', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'recipe', (t) => {
    t.itEach(
      'recipeName',
      'recipeDescription',
      'recipeCategory',
      'recipeDoses',
      'recipeDifficulty',
      'recipeIngredients',
      'recipePreparation'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.recipe.recipeName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.recipe.name).toContain(name);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.recipe.recipeDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.recipe.description).toContain(description);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.recipe.recipeCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.recipe.category).toContain(category);
        });
      });

      describe('doses()', () => {
        it('returns a random doses', () => {
          const doses = faker.recipe.recipeDoses();

          expect(doses).toBeTruthy();
          expect(doses).toBeTypeOf('string');
          expect(faker.definitions.recipe.doses).toContain(doses);
        });
      });

      describe('difficulty()', () => {
        it('returns a random difficulty', () => {
          const difficulty = faker.recipe.recipeDifficulty();

          expect(difficulty).toBeTruthy();
          expect(difficulty).toBeTypeOf('string');
          expect(faker.definitions.recipe.difficulty).toContain(difficulty);
        });
      });

      describe('ingredients()', () => {
        it('returns a random ingredients', () => {
          const ingredients = faker.recipe.recipeIngredients();

          expect(ingredients).toBeTruthy();
          expect(ingredients).toBeTypeOf('string');
          expect(faker.definitions.recipe.ingredients).toContain(ingredients);
        });
      });

      describe('preparation()', () => {
        it('returns a random preparation', () => {
          const preparation = faker.recipe.recipePreparation();

          expect(preparation).toBeTruthy();
          expect(preparation).toBeTypeOf('string');
          expect(faker.definitions.recipe.preparation).toContain(preparation);
        });
      });
    }
  });
});
