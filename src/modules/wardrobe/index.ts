import type { Faker } from '../..';

/**
 * Module to generate wardrobe related entries.
 */
export class WardrobeModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(WardrobeModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random wardrobe brand.
   *
   * @example
   * faker.wardrobe.wardrobeBrand() // 'Archiutti'
   *
   * @since 8.0.0
   */
  wardrobeBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.wardrobe.brand
    );
  }

  /**
   * Returns a random wardrobe name.
   *
   * @example
   * faker.wardrobe.wardrobeName() // Aqua'
   *
   * @since 8.0.0
   */
  wardrobeName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.wardrobe.name
    );
  }

  /**
   * Returns a random wardrobe category.
   *
   * @example
   * faker.wardrobe.wardrobeCategory() // 'With folding doors'
   *
   * @since 8.0.0
   */
  wardrobeCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.wardrobe.category
    );
  }

  /**
   * Returns a random wardrobe style.
   *
   * @example
   * faker.wardrobe.wardrobeStyle() // 'Design'
   *
   * @since 8.0.0
   */
  wardrobeStyle(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.wardrobe.style
    );
  }

  /**
   * Returns a random wardrobe material.
   *
   * @example
   * faker.wardrobe.wardrobeMaterial() // 'Wood'
   *
   * @since 8.0.0
   */
  wardrobeMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.wardrobe.material
    );
  }

  /**
   * Returns a random wardrobe color.
   *
   * @example
   * faker.wardrobe.wardrobeColor() // 'Grey'
   *
   * @since 8.0.0
   */
  wardrobeColor(): string {
    return this.faker.color.human();
  }
}
