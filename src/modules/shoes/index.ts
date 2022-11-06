import type { Faker } from '../..';

/**
 * Module to generate shoes related entries.
 */
export class ShoesModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(ShoesModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random shoes brand.
   *
   * @example
   * faker.shoes.shoesBrand() // 'Adidas'
   *
   * @since 8.0.0
   */
  shoesBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.shoes.brand);
  }

  /**
   * Returns a random shoes product type.
   *
   * @example
   * faker.shoes.shoesProductType() // 'Sneaker'
   *
   * @since 8.0.0
   */
  shoesProductType(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.shoes.productType
    );
  }

  /**
   * Returns a random shoes size.
   *
   * @example
   * faker.shoes.shoesSize() // 'M'
   *
   * @since 8.0.0
   */
  shoesSize(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.shoes.size);
  }

  /**
   * Returns a random shoes style.
   *
   * @example
   * faker.shoes.shoesStyle() // 'Casual'
   *
   * @since 8.0.0
   */
  shoesStyle(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.shoes.style);
  }

  /**
   * Returns a random shoes material.
   *
   * @example
   * faker.shoes.shoesMaterial() // 'Suede'
   *
   * @since 8.0.0
   */
  shoesMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.shoes.material
    );
  }

  /**
   * Returns a random shoes color.
   *
   * @example
   * faker.shoes.shoesColor() // 'Blue'
   *
   * @since 8.0.0
   */
  shoesColor(): string {
    return this.faker.color.human();
  }
}
