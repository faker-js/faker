import type { Faker } from '../../faker';
import { bindThisToMemberFunctions } from '../../internal/bind-this-to-member-functions';

/**
 * Module for generating food-related data.
 *
 * ### Overview
 *
 * This module provides methods to generate various food-related information, such as [dish names](https://fakerjs.dev/api/food.html#dish), [spices](https://fakerjs.dev/api/food.html#spice) or [vegetables](https://fakerjs.dev/api/food.html#vegetable).
 * To generate descriptions for a dish use [`description()`](https://fakerjs.dev/api/food.html#description).
 */
export class FoodModule {
  constructor(private readonly faker: Faker) {
    bindThisToMemberFunctions(this);
  }

  /**
   * Generates a random dish description.
   *
   * @example
   * faker.food.description() // 'Three Coconut Water with Pumpkin, Turnips, Peppers, Raspberry and Coffee. With a side of baked Apricots, and your choice of Pineapple or Kidney Beans'
   *
   * @since 8.3.0
   */
  description(): string {
    return this.faker.helpers.fake(
      this.faker.definitions.food.description_pattern
    );
  }

  /**
   * Generates a random dish name.
   *
   * @example
   * faker.food.dish() // 'Lasagne'
   *
   * @since 8.3.0
   */
  dish(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.dish);
  }

  /**
   * Generates a random food's ethnic category.
   *
   * @example
   * faker.food.ethnicCategory() // 'Italian'
   *
   * @since 8.3.0
   */
  ethnicCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.food.ethnic_category
    );
  }

  /**
   * Generates a random fruit name.
   *
   * @example
   * faker.food.fruit() // 'Lemon'
   *
   * @since 8.3.0
   */
  fruit(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.fruit);
  }

  /**
   * Generates a random ingredient name.
   *
   * @example
   * faker.food.ingredient() // 'Butter'
   *
   * @since 8.3.0
   */
  ingredient(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.food.ingredient
    );
  }

  /**
   * Generates a random spice name.
   *
   * @example
   * faker.food.spice() // 'Chilli'
   *
   * @since 8.3.0
   */
  spice(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.spice);
  }

  /**
   * Generates a random spice name.
   *
   * @example
   * faker.food.vegetable() // 'Broccoli'
   *
   * @since 8.3.0
   */
  vegetable(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.food.vegetable
    );
  }
}
