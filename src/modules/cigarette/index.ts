import type { Faker } from '../..';

/**
 * Module to generate cigarette related entries.
 */
export class CigaretteModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(CigaretteModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random cigarette brand.
   *
   * @example
   * faker.cigarette.cigaretteBrand() // 'Marlboro'
   *
   * @since 8.0.0
   */
  cigaretteBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.cigarette.brand
    );
  }

  /**
   * Returns a random cigarette type.
   *
   * @example
   * faker.cigarette.cigaretteType() // 'Blu'
   *
   * @since 8.0.0
   */
  cigaretteType(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.cigarette.type
    );
  }

  /**
   * Returns a random cigarette origin.
   *
   * @example
   * faker.cigarette.cigaretteOrigin() // 'Italy'
   * @since 8.0.0
   */
  cigaretteOrigin(): string {
    return this.faker.location.country();
  }
}
