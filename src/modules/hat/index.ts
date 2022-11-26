import type { Faker } from '../..';

/**
 * Module to generate hat related entries.
 */
export class HatModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(HatModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random hat brand.
   *
   * @example
   * faker.hat.hatBrand() // 'Gucci'
   *
   * @since 8.0.0
   */
  hatBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.hat.brand);
  }

  /**
   * Returns a random hat description.
   *
   * @example
   * faker.hat.hatDescription() // 'Reversible Banner Black/Yellow Beanie'
   *
   * @since 8.0.0
   */
  hatDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.hat.description
    );
  }

  /**
   * Returns a random hat material.
   *
   * @example
   * faker.hat.hatMaterial() // 'Cotton'
   *
   * @since 8.0.0
   */
  hatMaterial(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.hat.material);
  }

  /**
   * Returns a random hat style.
   *
   * @example
   * faker.hat.hatStyle() // 'Short cap'
   *
   * @since 8.0.0
   */
  hatStyle(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.hat.style);
  }

  /**
   * Returns a random hat size.
   *
   * @example
   * faker.hat.hatSize() // 'S/M'
   *
   * @since 8.0.0
   */
  hatSize(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.hat.size);
  }

  /**
   * Returns a random hat color.
   *
   * @example
   * faker.hat.hatColor() // 'Grey'
   *
   * @since 8.0.0
   */
  hatColor(): string {
    return this.faker.color.human();
  }
}
