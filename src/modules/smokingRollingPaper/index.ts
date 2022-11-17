import type { Faker } from '../..';

/**
 * Module to generate smoking filter related entries.
 */
export class SmokingRollingPaperModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      SmokingRollingPaperModule.prototype
    )) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random smoking rolling paper brand.
   *
   * @example
   * faker.smokingRollingPaper.smokingRollingPaperBrand() // 'Rizla'
   *
   * @since 8.0.0
   */
  smokingRollingPaperBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.smokingRollingPaper.brand
    );
  }

  /**
   * Returns a random smoking rolling paper size.
   *
   * @example
   * faker.smokingRollingPaper.smokingRollingPaperSize() // 'Long'
   * @since 8.0.0
   */
  smokingRollingPaperSize(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.smokingRollingPaper.size
    );
  }

  /**
   * Returns a random smoking rolling paper color.
   *
   * @example
   * faker.smokingRollingPaper.smokingRollingPaperColor() // 'Yellow'
   *
   * @since 8.0.0
   */
  smokingRollingPaperColor(): string {
    return this.faker.color.human();
  }
}
