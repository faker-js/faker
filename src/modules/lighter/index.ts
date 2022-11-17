import type { Faker } from '../..';

/**
 * Module to generate lighter related entries.
 */
export class LighterModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(LighterModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random lighter brand.
   *
   * @example
   * faker.lighter.lighterBrand() // 'Clipper'
   *
   * @since 8.0.0
   */
  lighterBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.lighter.brand
    );
  }

  /**
   * Returns a random lighter material.
   *
   * @example
   * faker.lighter.lighterMaterial() // 'Brass'
   * @since 8.0.0
   */
  lighterMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.lighter.material
    );
  }

  /**
   * Returns a random lighter color.
   *
   * @example
   * faker.lighter.lighterColor() // 'Yellow'
   *
   * @since 8.0.0
   */
  lighterColor(): string {
    return this.faker.color.human();
  }
}
