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
   * faker.fish.fishName() // 'Black Angus Creekstone Farms'
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
   * faker.fish.fishDescription() // 'The TomaHawk is a cut made from the front of the loin. It owes its name to the famous ax used by Native Americans. It is characterized by the typical bone left at least 30 cm long and by the high marbling.'
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
   * faker.fish.fishCategory() // 'Beef'
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
