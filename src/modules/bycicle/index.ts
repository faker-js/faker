import type { Faker } from '../..';

/**
 * Module to generate bycicle related entries.
 */
export class BycicleModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(BycicleModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random bycicle name.
   *
   * @example
   * faker.bycicle.bycicleName() // 'Giant PROPEL ADVANCED SL 1'
   *
   * @since 8.0.0
   */
  bycicleName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.bycicle.name);
  }

  /**
   * Returns a random bycicle brand.
   *
   * @example
   * faker.bycicle.bycicleBrand() // 'Giant Bikes'
   *
   * @since 8.0.0
   */
  bycicleBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.bycicle.brand
    );
  }

  /**
   * Returns a random bycicle category.
   *
   * @example
   * faker.bycicle.bycicleCategory() // 'Gravel'
   *
   * @since 8.0.0
   */
  bycicleCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.bycicle.category
    );
  }

  /**
   * Returns a random bycicle description.
   *
   * @example
   * faker.bycicle.bycicleDescription() // 'These bikes give kids confidence, comfort and maximum control. The BMC Twostroke AL 20" fits children from 5 to 8 years old - it practically grows with them! A guarantee of light and reliable fun!'
   *
   * @since 8.0.0
   */
  bycicleDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.bycicle.description
    );
  }

  /**
   * Returns a random bycicle material.
   *
   * @example
   * faker.bycicle.bycicleMaterial() // 'Carbon'
   *
   * @since 8.0.0
   */
  bycicleMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.bycicle.material
    );
  }

  /**
   * Returns a random bycicle size.
   *
   * @example
   * faker.bycicle.bycicleSize() // 'XL'
   *
   * @since 8.0.0
   */
  bycicleSize(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.bycicle.size);
  }

  /**
   * Returns a random bycicle gender.
   *
   * @example
   * faker.bycicle.bycicleGender() // 'Men'
   *
   * @since 8.0.0
   */
  bycicleGender(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.bycicle.gender
    );
  }

  /**
   * Returns a random bycicle color.
   *
   * @example
   * faker.bycicle.bycicleColor() // 'Grey'
   *
   * @since 8.0.0
   */
  bycicleColor(): string {
    return this.faker.color.human();
  }
}
