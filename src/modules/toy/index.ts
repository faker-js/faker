import type { Faker } from '../..';

/**
 * Module to generate toy related entries.
 */
export class ToyModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(ToyModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random toy name.
   *
   * @example
   * faker.toy.toyName() // 'Puzzle hearts'
   *
   * @since 8.0.0
   */
  toyName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.toy.name);
  }

  /**
   * Returns a random toy brand.
   *
   * @example
   * faker.toy.toyBrand() // 'Plus-plus'
   *
   * @since 8.0.0
   */
  toyBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.toy.brand);
  }

  /**
   * Returns a random toy category.
   *
   * @example
   * faker.toy.toyCategory() // 'Puzzle'
   *
   * @since 8.0.0
   */
  toyCategory(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.toy.category);
  }

  /**
   * Returns a random toy description.
   *
   * @example
   * faker.toy.toyDescription() // 'Set of 250 pieces to build your cute hearts: match colors and numbers to create your own mosaic composition. Follow the pattern and match the colors correctly to create cute hearts with the Plus-Plus puzzle by number.'
   *
   * @since 8.0.0
   */
  toyDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.toy.description
    );
  }

  /**
   * Returns a random toyry.
   *
   * @example
   * faker.toy.toyAge() // '0-2 Year'
   *
   * @since 8.0.0
   */
  toyAge(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.toy.age);
  }
}
