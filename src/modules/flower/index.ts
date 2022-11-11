import type { Faker } from '../..';

/**
 * Module to generate flower related entries.
 */
export class FlowerModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(FlowerModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random flower name.
   *
   * @example
   * faker.flower.flowerName() // 'Pleione'
   *
   * @since 8.0.0
   */
  flowerName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.flower.name);
  }

  /**
   * Returns a random flower description.
   *
   * @example
   * faker.flower.flowerDescription() // 'The Pleione is a genus of orchid belonging to the Orchidaceae family.'
   *
   * @since 8.0.0
   */
  flowerDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.flower.description
    );
  }

  /**
   * Returns a random flower pot size.
   *
   * @example
   * faker.flower.flowerPotSize() // '19cm.'
   *
   * @since 8.0.0
   */
  flowerPotSize(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.flower.potSize
    );
  }

  /**
   * Returns a random flower origin.
   *
   * @example
   * faker.flower.flowerOrigin() // 'Italy'
   *
   * @since 8.0.0
   */
  flowerOrigin(): string {
    return this.faker.location.country();
  }
}
