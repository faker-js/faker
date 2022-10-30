import type { Faker } from '../..';

/**
 * Module to generate recipe related entries.
 */
export class RecipeModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(RecipeModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random recipe name.
   *
   * @example
   * faker.recipe.recipeName() // 'Pizza'
   *
   * @since 8.0.0
   */
  recipeName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.recipe.name);
  }

  /**
   * Returns a random recipe description.
   *
   * @example
   * faker.recipe.recipeDescription() // 'The pizza margherita is the typical pizza to be made at home with its sauce of tomato, mozzarella, oil and basil.'
   *
   * @since 8.0.0
   */
  recipeDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.recipe.description
    );
  }

  /**
   * Returns a random recipe category.
   *
   * @example
   * faker.recipe.recipeCategory() // 'Pizza'
   *
   * @since 8.0.0
   */
  recipeCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.recipe.category
    );
  }

  /**
   * Returns a random recipe ingredients.
   *
   * @example
   * faker.recipe.recipeIngredients() // 'Tomato sauce, mozzarella, basil, oil'
   *
   * @since 8.0.0
   */
  recipeIngredients(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.recipe.ingredients
    );
  }

  /**
   * Returns a random recipe preparation.
   *
   * @example
   * faker.recipe.recipePreparation() // 'Dissolve the brewer's yeast in a little warm water, about 10 ml. Add the salt to the flour and mix. Pour the water into a large container, add the dissolved yeast, the oil and the flour a little at a time, while with the other hand you begin to knead. Etc ..'
   *
   * @since 8.0.0
   */
  recipePreparation(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.recipe.preparation
    );
  }

  /**
   * Returns a random recipe difficulty.
   *
   * @example
   * faker.recipe.recipeDifficulty() // 'Easy'
   *
   * @since 8.0.0
   */
  recipeDifficulty(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.recipe.difficulty
    );
  }

  /**
   * Returns a random recipe doses.
   *
   * @example
   * faker.recipe.recipeDoses() // '2 people'
   *
   * @since 8.0.0
   */
  recipeDoses(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.recipe.doses);
  }
}
