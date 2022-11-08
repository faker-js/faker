import type { Faker } from '../..';

/**
 * Module to generate jewels related entries.
 */
export class JewelsModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(JewelsModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random jewels brand.
   *
   * @example
   * faker.jewels.jewelsBrand() // 'Fossil'
   *
   * @since 8.0.0
   */
  jewelsBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.jewels.brand);
  }

  /**
   * Returns a random jewels model.
   *
   * @example
   * faker.jewels.jewelsModel() // 'Tennis'
   *
   * @since 8.0.0
   */
  jewelsModel(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.jewels.model);
  }

  /**
   * Returns a random jewels category.
   *
   * @example
   * faker.jewels.jewelsCategory() // 'Ring'
   *
   * @since 8.0.0
   */
  jewelsCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.jewels.category
    );
  }

  /**
   * Returns a random jewels material.
   *
   * @example
   * faker.jewels.jewelsMaterial() // 'Cachemire'
   *
   * @since 8.0.0
   */
  jewelsMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.jewels.material
    );
  }

  /**
   * Returns a random jewels gender.
   *
   * @example
   * faker.jewels.jewelsGender() // 'Man'
   *
   * @since 8.0.0
   */
  jewelsGender(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.jewels.gender
    );
  }
}
