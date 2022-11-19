import type { Faker } from '../..';

/**
 * Module to generate meat related entries.
 */
export class MeatModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(MeatModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random meat name.
   *
   * @example
   * faker.meat.meatName() // 'Black Angus Creekstone Farms'
   *
   * @since 8.0.0
   */
  meatName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.meat.name);
  }

  /**
   * Returns a random meat description.
   *
   * @example
   * faker.meat.meatDescription() // 'The TomaHawk is a cut made from the front of the loin. It owes its name to the famous ax used by Native Americans. It is characterized by the typical bone left at least 30 cm long and by the high marbling.'
   *
   * @since 8.0.0
   */
  meatDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.meat.description
    );
  }

  /**
   * Returns a random meat category.
   *
   * @example
   * faker.meat.meatCategory() // 'Beef'
   *
   * @since 8.0.0
   */
  meatCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.meat.category
    );
  }

  /**
   * Returns a random meat cut.
   *
   * @example
   * faker.meat.meatCut() // 'Sirloin'
   *
   * @since 8.0.0
   */
  meatCut(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.meat.cut);
  }

  /**
   * Returns a random meat origin.
   *
   * @example
   * faker.meat.meatOrigin() // 'Italy'
   *
   * @since 8.0.0
   */
  meatOrigin(): string {
    return this.faker.location.country();
  }
}
