import type { Faker } from '../..';

/**
 * Module to generate pizza related entries.
 */
export class PizzaModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(PizzaModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random pizza name.
   *
   * @example
   * faker.pizza.pizzaName() // 'Pizza Margherita'
   *
   * @since 8.0.0
   */
  pizzaName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.pizza.name);
  }

  /**
   * Returns a random pizza description.
   *
   * @example
   * faker.pizza.pizzaDescription() // 'The pizza margherita is the typical pizza to be made at home with its sauce of tomato, mozzarella, oil and basil.'
   *
   * @since 8.0.0
   */
  pizzaDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.pizza.description
    );
  }

  /**
   * Returns a random pizza category.
   *
   * @example
   * faker.pizza.pizzaCategory() // 'Classic'
   *
   * @since 8.0.0
   */
  pizzaCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.pizza.category
    );
  }

  /**
   * Returns a random pizza ingredients.
   *
   * @example
   * faker.pizza.pizzaIngredients() // 'Tomato sauce, mozzarella, basil, oil'
   *
   * @since 8.0.0
   */
  pizzaIngredients(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.pizza.ingredients
    );
  }

  /**
   * Returns a random pizza preparation.
   *
   * @example
   * faker.pizza.pizzaPreparation() // 'Dissolve the brewer's yeast in a little warm water, about 10 ml. Add the salt to the flour and mix. Pour the water into a large container, add the dissolved yeast, the oil and the flour a little at a time, while with the other hand you begin to knead. Etc ..'
   *
   * @since 8.0.0
   */
  pizzaPreparation(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.pizza.preparation
    );
  }
}
