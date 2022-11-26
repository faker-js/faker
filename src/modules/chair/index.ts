import type { Faker } from '../..';

/**
 * Module to generate chair related entries.
 */
export class ChairModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(ChairModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random chair name.
   *
   * @example
   * faker.chair.chairName() // 'Air High'
   *
   * @since 8.0.0
   */
  chairName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.chair.name);
  }

  /**
   * Returns a random chair category.
   *
   * @example
   * faker.chair.chairCategory() // 'Office'
   *
   * @since 8.0.0
   */
  chairCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.chair.category
    );
  }

  /**
   * Returns a random chair style.
   *
   * @example
   * faker.chair.chairStyle() // 'Design'
   *
   * @since 8.0.0
   */
  chairStyle(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.chair.style);
  }

  /**
   * Returns a random chair material.
   *
   * @example
   * faker.chair.chairMaterial() // 'Wood'
   *
   * @since 8.0.0
   */
  chairMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.chair.material
    );
  }

  /**
   * Returns a random chair color.
   *
   * @example
   * faker.chair.chairColor() // 'Grey'
   *
   * @since 8.0.0
   */
  chairColor(): string {
    return this.faker.color.human();
  }
}
