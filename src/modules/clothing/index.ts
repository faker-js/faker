import type { Faker } from '../..';

/**
 * Module to generate clothing related entries.
 */
export class ClothingModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(ClothingModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random clothing brand.
   *
   * @example
   * faker.clothing.clothingBrand() // 'Adidas'
   *
   * @since 8.0.0
   */
  clothingBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.clothing.brand
    );
  }

  /**
   * Returns a random clothing product type.
   *
   * @example
   * faker.clothing.clothingProductType() // 'Jeans'
   *
   * @since 8.0.0
   */
  clothingProductType(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.clothing.productType
    );
  }

  /**
   * Returns a random clothing size.
   *
   * @example
   * faker.clothing.clothingSize() // 'M'
   *
   * @since 8.0.0
   */
  clothingSize(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.clothing.size
    );
  }

  /**
   * Returns a random clothing style.
   *
   * @example
   * faker.clothing.clothingStyle() // 'Casual'
   *
   * @since 8.0.0
   */
  clothingStyle(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.clothing.style
    );
  }

  /**
   * Returns a random clothing material.
   *
   * @example
   * faker.clothing.clothingMaterial() // 'Cachemire'
   *
   * @since 8.0.0
   */
  clothingMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.clothing.material
    );
  }

  /**
   * Returns a random clothing color.
   *
   * @example
   * faker.clothing.clothingColor() // 'Blue'
   *
   * @since 8.0.0
   */
  clothingColor(): string {
    return this.faker.color.human();
  }
}
