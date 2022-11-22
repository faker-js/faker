import type { Faker } from '../..';

/**
 * Module to generate bed related entries.
 */
export class BedModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(BedModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random bed name.
   *
   * @example
   * faker.bed.bedName() // 'Blend'
   *
   * @since 8.0.0
   */
  bedName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.bed.name);
  }

  /**
   * Returns a random bed category.
   *
   * @example
   * faker.bed.bedCategory() // 'Double beds'
   *
   * @since 8.0.0
   */
  bedCategory(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.bed.category);
  }

  /**
   * Returns a random bed style.
   *
   * @example
   * faker.bed.bedStyle() // 'Design'
   *
   * @since 8.0.0
   */
  bedStyle(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.bed.style);
  }

  /**
   * Returns a random bed material.
   *
   * @example
   * faker.bed.bedMaterial() // 'Fabric'
   *
   * @since 8.0.0
   */
  bedMaterial(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.bed.material);
  }

  /**
   * Returns a random bed color.
   *
   * @example
   * faker.bed.bedColor() // 'Grey'
   *
   * @since 8.0.0
   */
  bedColor(): string {
    return this.faker.color.human();
  }
}
