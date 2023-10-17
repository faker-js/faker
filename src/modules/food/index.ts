import type { Faker } from '../../faker';
import { bindThisToMemberFunctions } from '../../internal/bind-this-to-member-functions';

export class FoodModule {
  constructor(private readonly faker: Faker) {
    bindThisToMemberFunctions(this);
  }

  /**
   * @example
   * faker.food.description() // 'Lasagne'
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
   * @example
   * faker.food.ethnicCategory() // 'Lasagne'
   *
   * @since 8.3.0
   */
  ethnicCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.food.ethnic_category
    );
  }

  /**
   * @example
   * faker.food.fruit() // 'Lemon'
   *
   * @since 8.3.0
   */
  fruit(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.fruit);
  }

  /**
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
   * @example
   * faker.food.spice() // 'Chilli'
   *
   * @since 8.3.0
   */
  spice(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.spice);
  }

  /**
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
