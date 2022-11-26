import type { Faker } from '../..';

/**
 * Module to generate drink related entries.
 */
export class DrinkModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(DrinkModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random drink name.
   *
   * @example
   * faker.drink.drinkName() // 'Metaxa'
   *
   * @since 8.0.0
   */
  drinkName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.drink.name);
  }

  /**
   * Returns a random drink description.
   *
   * @example
   * faker.drink.drinkDescription() // 'The exact formula has remained a closely garded secret ever since.'
   *
   * @since 8.0.0
   */
  drinkDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.drink.description
    );
  }

  /**
   * Returns a random drink category.
   *
   * @example
   * faker.drink.drinkCategory() // 'Beer'
   *
   * @since 8.0.0
   */
  drinkCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.drink.category
    );
  }

  /**
   * Returns a random drink origin.
   *
   * @example
   * faker.drink.drinkOrigin() // 'Italy'
   *
   * @since 8.0.0
   */
  drinkOrigin(): string {
    return this.faker.location.country();
  }
}
