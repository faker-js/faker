import type { Faker } from '../..';

/**
 * Module to generate food related entries.
 */
export class FoodModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(FoodModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random food name.
   *
   * @example
   * faker.food.name() // 'Pizza'
   *
   * @since 8.0.0
   */
  name(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.name);
  }

  /**
   * Returns a random food type.
   *
   * @example
   * faker.food.type() // 'Fish'
   *
   * @since 8.0.0
   */
  type(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.type);
  }

  /**
   * Returns a random food description.
   *
   * @example
   * faker.food.description() // 'Tipical italian food'
   *
   * @since 8.0.0
   */
  description(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.food.description
    );
  }

  /**
   * Returns a random food flavor.
   *
   * @example
   * faker.food.flavor() // 'Sublime'
   *
   * @since 8.0.0
   */
  flavor(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.flavor);
  }
}
