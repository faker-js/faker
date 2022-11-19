import type { Faker } from '../..';

/**
 * Module to generate tire related entries.
 */
export class TireModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(TireModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random tire brand.
   *
   * @example
   * faker.tire.tireBrand() // 'Michelin'
   *
   * @since 8.0.0
   */
  tireBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.tire.brand);
  }

  /**
   * Returns a random tire name.
   *
   * @example
   * faker.tire.tireName() // 'X-ICE SNOW'
   *
   * @since 8.0.0
   */
  tireName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.tire.name);
  }

  /**
   * Returns a random tire season.
   *
   * @example
   * faker.tire.tireSeason() // 'Winter'
   *
   * @since 8.0.0
   */
  tireSeason(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.tire.season);
  }

  /**
   * Returns a random tire width.
   *
   * @example
   * faker.tire.tireWidth() // '225'
   *
   * @since 8.0.0
   */
  tireWidth(): number {
    return this.faker.datatype.number({ min: 10, max: 500 });
  }

  /**
   * Returns a random tire height.
   *
   * @example
   * faker.tire.tireHeight() // '75'
   *
   * @since 8.0.0
   */
  tireHeight(): number {
    return this.faker.datatype.number({ min: 35, max: 75 });
  }

  /**
   * Returns a random tire diameter.
   *
   * @example
   * faker.tire.tireDiameter() // '16'
   *
   * @since 8.0.0
   */
  tireDiameter(): number {
    return this.faker.datatype.number({ min: 16, max: 19 });
  }
}
