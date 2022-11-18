import type { Faker } from '../..';

/**
 * Module to generate smoking filter related entries.
 */
export class SmokingFilterModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      SmokingFilterModule.prototype
    )) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random smokingFilter brand.
   *
   * @example
   * faker.smokingFilter.smokingFilterBrand() // 'Rizla'
   *
   * @since 8.0.0
   */
  smokingFilterBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.smokingFilter.brand
    );
  }

  /**
   * Returns a random smokingFilter category.
   *
   * @example
   * faker.smokingFilter.smokingFilterSize() // 'Slim'
   * @since 8.0.0
   */
  smokingFilterSize(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.smokingFilter.size
    );
  }
}
