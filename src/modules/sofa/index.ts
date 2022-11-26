import type { Faker } from '../..';

/**
 * Module to generate sofa related entries.
 */
export class SofaModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(SofaModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random sofa name.
   *
   * @example
   * faker.sofa.sofaName() // 'Alfonsine'
   *
   * @since 8.0.0
   */
  sofaName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.sofa.name);
  }

  /**
   * Returns a random sofa category.
   *
   * @example
   * faker.sofa.sofaCategory() // 'Linear'
   *
   * @since 8.0.0
   */
  sofaCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.sofa.category
    );
  }

  /**
   * Returns a random sofa style.
   *
   * @example
   * faker.sofa.sofaStyle() // 'Design'
   *
   * @since 8.0.0
   */
  sofaStyle(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.sofa.style);
  }

  /**
   * Returns a random sofa material.
   *
   * @example
   * faker.sofa.sofaMaterial() // 'Fabric'
   *
   * @since 8.0.0
   */
  sofaMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.sofa.material
    );
  }

  /**
   * Returns a random sofa sitting.
   *
   * @example
   * faker.sofa.sofaSitting() // 'Two seats'
   *
   * @since 8.0.0
   */
  sofaSitting(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.sofa.sitting);
  }

  /**
   * Returns a random sofa color.
   *
   * @example
   * faker.sofa.sofaColor() // 'Grey'
   *
   * @since 8.0.0
   */
  sofaColor(): string {
    return this.faker.color.human();
  }
}
