import type { Faker } from '../..';

/**
 * Module to generate wheel related entries.
 */
export class WheelModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(WheelModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random wheel brand.
   *
   * @example
   * faker.wheel.wheelBrand() // 'Michelin'
   *
   * @since 8.0.0
   */
  wheelBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.wheel.brand);
  }

  /**
   * Returns a random wheel name.
   *
   * @example
   * faker.wheel.wheelName() // 'X-ICE SNOW'
   *
   * @since 8.0.0
   */
  wheelName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.wheel.name);
  }

  /**
   * Returns a random wheel material.
   *
   * @example
   * faker.wheel.wheelMaterial() // 'Alluminium'
   *
   * @since 8.0.0
   */
  wheelMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.wheel.material
    );
  }

  /**
   * Returns a random wheel width.
   *
   * @example
   * faker.wheel.wheelWidth() // '225'
   *
   * @since 8.0.0
   */
  wheelWidth(): number {
    return this.faker.datatype.number({ min: 10, max: 500 });
  }

  /**
   * Returns a random wheel height.
   *
   * @example
   * faker.wheel.wheelHeight() // '75'
   *
   * @since 8.0.0
   */
  wheelHeight(): number {
    return this.faker.datatype.number({ min: 35, max: 75 });
  }

  /**
   * Returns a random wheel diameter.
   *
   * @example
   * faker.wheel.wheelDiameter() // '16'
   *
   * @since 8.0.0
   */
  wheelDiameter(): number {
    return this.faker.datatype.number({ min: 16, max: 19 });
  }
}
