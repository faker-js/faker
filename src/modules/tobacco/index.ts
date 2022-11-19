import type { Faker } from '../..';

/**
 * Module to generate tobacco related entries.
 */
export class TobaccoModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(TobaccoModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random tobacco brand.
   *
   * @example
   * faker.tobacco.tobaccoBrand() // 'Marlboro'
   *
   * @since 8.0.0
   */
  tobaccoBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.tobacco.brand
    );
  }

  /**
   * Returns a random tobacco type.
   *
   * @example
   * faker.tobacco.tobaccoType() // 'Red'
   *
   * @since 8.0.0
   */
  tobaccoType(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.tobacco.type);
  }

  /**
   * Returns a random tobacco origin.
   *
   * @example
   * faker.tobacco.tobaccoOrigin() // 'Italy'
   * @since 8.0.0
   */
  tobaccoOrigin(): string {
    return this.faker.location.country();
  }
}
