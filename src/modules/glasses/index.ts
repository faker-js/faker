import type { Faker } from '../..';

/**
 * Module to generate glasses related entries.
 */
export class GlassesModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(GlassesModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random glasses brand.
   *
   * @example
   * faker.glasses.glassesBrand() // 'Gucci'
   *
   * @since 8.0.0
   */
  glassesBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.glasses.brand
    );
  }

  /**
   * Returns a random glasses product type.
   *
   * @example
   * faker.glasses.glassesProductType() // 'Sun'
   *
   * @since 8.0.0
   */
  glassesProductType(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.glasses.productType
    );
  }

  /**
   * Returns a random glasses gender.
   *
   * @example
   * faker.glasses.glassesGender() // 'Man'
   *
   * @since 8.0.0
   */
  glassesGender(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.glasses.gender
    );
  }

  /**
   * Returns a random glasses size.
   *
   * @example
   * faker.glasses.glassesSize() // '53'
   *
   * @since 8.0.0
   */
  glassesSize(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.glasses.size);
  }

  /**
   * Returns a random glasses shape.
   *
   * @example
   * faker.glasses.glassesShape() // 'Aviator'
   *
   * @since 8.0.0
   */
  glassesShape(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.glasses.shape
    );
  }

  /**
   * Returns a random glasses style.
   *
   * @example
   * faker.glasses.glassesLensType() // 'Blue Light Glasses'
   *
   * @since 8.0.0
   */
  glassesLensType(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.glasses.lensType
    );
  }

  /**
   * Returns a random glasses material.
   *
   * @example
   * faker.glasses.glassesMaterial() // 'Cachemire'
   *
   * @since 8.0.0
   */
  glassesMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.glasses.material
    );
  }

  /**
   * Returns a random glasses color.
   *
   * @example
   * faker.glasses.glassesColor() // 'Blue'
   *
   * @since 8.0.0
   */
  glassesColor(): string {
    return this.faker.color.human();
  }
}
