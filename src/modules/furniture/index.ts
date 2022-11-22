import type { Faker } from '../..';

/**
 * Module to generate furniture related entries.
 */
export class FurnitureModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(FurnitureModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random furniture name.
   *
   * @example
   * faker.furniture.furnitureName() // 'Aqua'
   *
   * @since 8.0.0
   */
  furnitureName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.furniture.name
    );
  }

  /**
   * Returns a random furniture category.
   *
   * @example
   * faker.furniture.furnitureCategory() // 'Bed'
   *
   * @since 8.0.0
   */
  furnitureCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.furniture.category
    );
  }

  /**
   * Returns a random furniture style.
   *
   * @example
   * faker.furniture.furnitureStyle() // 'Modern'
   *
   * @since 8.0.0
   */
  furnitureStyle(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.furniture.style
    );
  }

  /**
   * Returns a random furniture material.
   *
   * @example
   * faker.furniture.furnitureMaterial() // 'Wood'
   *
   * @since 8.0.0
   */
  furnitureMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.furniture.material
    );
  }

  /**
   * Returns a random furniture brand.
   *
   * @example
   * faker.furniture.furnitureBrand() // 'Ernesto Meda'
   *
   * @since 8.0.0
   */
  furnitureBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.furniture.brand
    );
  }

  /**
   * Returns a random furniture color.
   *
   * @example
   * faker.furniture.furnitureColor() // 'Grey'
   *
   * @since 8.0.0
   */
  furnitureColor(): string {
    return this.faker.color.human();
  }
}
