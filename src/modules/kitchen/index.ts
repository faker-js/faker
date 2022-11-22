import type { Faker } from '../..';

/**
 * Module to generate kitchen related entries.
 */
export class KitchenModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(KitchenModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random kitchen name.
   *
   * @example
   * faker.kitchen.kitchenName() // 'Aqua'
   *
   * @since 8.0.0
   */
  kitchenName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.kitchen.name);
  }

  /**
   * Returns a random kitchen category.
   *
   * @example
   * faker.kitchen.kitchenCategory() // 'Linear'
   *
   * @since 8.0.0
   */
  kitchenCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.kitchen.category
    );
  }

  /**
   * Returns a random kitchen style.
   *
   * @example
   * faker.kitchen.kitchenStyle() // 'Modern'
   *
   * @since 8.0.0
   */
  kitchenStyle(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.kitchen.style
    );
  }

  /**
   * Returns a random kitchen material.
   *
   * @example
   * faker.kitchen.kitchenMaterial() // 'Wood'
   *
   * @since 8.0.0
   */
  kitchenMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.kitchen.material
    );
  }

  /**
   * Returns a random kitchen brand.
   *
   * @example
   * faker.kitchen.kitchenBrand() // 'Ernesto Meda'
   *
   * @since 8.0.0
   */
  kitchenBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.kitchen.brand
    );
  }

  /**
   * Returns a random kitchen color.
   *
   * @example
   * faker.kitchen.kitchenColor() // 'Grey'
   *
   * @since 8.0.0
   */
  kitchenColor(): string {
    return this.faker.color.human();
  }
}
