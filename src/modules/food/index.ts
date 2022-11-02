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
   * faker.food.foodName() // 'Pizza'
   *
   * @since 8.0.0
   */
  foodName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.name);
  }

  /**
   * Returns a random food type.
   *
   * @example
   * faker.food.foodType() // 'Fish'
   *
   * @since 8.0.0
   */
  foodType(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.type);
  }

  /**
   * Returns a random food description.
   *
   * @example
   * faker.food.foodDescription() // 'Tipical italian food'
   *
   * @since 8.0.0
   */
  foodDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.food.description
    );
  }

  /**
   * Returns a random food flavor.
   *
   * @example
   * faker.food.foodFlavor() // 'Sublime'
   *
   * @since 8.0.0
   */
  foodFlavor(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.flavor);
  }

  /**
   * Returns a random food origin.
   *
   * @example
   * faker.food.foodOrigin() // 'Italy'
   *
   * @since 8.0.0
   */
  foodOrigin(): string {
    return this.faker.location.country();
  }
}
