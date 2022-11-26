import type { Faker } from '../..';

/**
 * Module to generate fish related entries.
 */
export class FishModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(FishModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random fish name.
   *
   * @example
   * faker.fish.fishName() // 'Sole'
   *
   * @since 8.0.0
   */
  fishName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.fish.name);
  }

  /**
   * Returns a random fish description.
   *
   * @example
   * faker.fish.fishDescription() // 'The sea bass is raised in Italy.  It is a low-fat sea fish, with tasty and digestible meat, rich in nutritional properties and essential for a balanced diet. Sea bass lends itself to the creation of recipes for appetizers and main courses but is also used to season tasty pasta dishes.'
   *
   * @since 8.0.0
   */
  fishDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.fish.description
    );
  }

  /**
   * Returns a random fish category.
   *
   * @example
   * faker.fish.fishCategory() // 'Slices, fillets and whole fish'
   *
   * @since 8.0.0
   */
  fishCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.fish.category
    );
  }

  /**
   * Returns a random fish origin.
   *
   * @example
   * faker.fish.fishOrigin() // 'Italy'
   *
   * @since 8.0.0
   */
  fishOrigin(): string {
    return this.faker.location.country();
  }
}
