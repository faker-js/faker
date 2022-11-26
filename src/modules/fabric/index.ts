import type { Faker } from '../..';

/**
 * Module to generate fabric related entries.
 */
export class FabricModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(FabricModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random fabric name.
   *
   * @example
   * faker.fabric.fabricName() // 'Liberty Chelsea Georgette'
   *
   * @since 8.0.0
   */
  fabricName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.fabric.name);
  }

  /**
   * Returns a random fabric description.
   *
   * @example
   * faker.fabric.fabricDescription() // 'An Italian-made Liberty silk from the Chelsea Georgette range - Potters Quilt.'
   *
   * @since 8.0.0
   */
  fabricDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.fabric.description
    );
  }

  /**
   * Returns a random fabric category.
   *
   * @example
   * faker.fabric.fabricCategory() // 'Silk'
   *
   * @since 8.0.0
   */
  fabricCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.fabric.category
    );
  }

  /**
   * Returns a random fabric style.
   *
   * @example
   * faker.fabric.fabricStyle() // 'Abstract'
   *
   * @since 8.0.0
   */
  fabricStyle(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.fabric.style);
  }

  /**
   * Returns a random fabric composition.
   *
   * @example
   * faker.fabric.fabricComposition() // '100% Cotton'
   *
   * @since 8.0.0
   */
  fabricComposition(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.fabric.composition
    );
  }

  /**
   * Returns a random fabric color.
   *
   * @example
   * faker.fabric.fabricColor() // 'Grey'
   *
   * @since 8.0.0
   */
  fabricColor(): string {
    return this.faker.color.human();
  }
}
