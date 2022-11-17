import type { Faker } from '../..';

/**
 * Module to generate condom related entries.
 */
export class CondomModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(CondomModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random condom brand.
   *
   * @example
   * faker.condom.condomBrand() // 'Durex'
   *
   * @since 8.0.0
   */
  condomBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.condom.brand);
  }

  /**
   * Returns a random condom name.
   *
   * @example
   * faker.condom.condomName() // 'Orgasm'Intense'
   *
   * @since 8.0.0
   */
  condomName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.condom.name);
  }

  /**
   * Returns a random condom typr.
   *
   * @example
   * faker.condom.condomType() // 'Cheap'
   *
   * @since 8.0.0
   */
  condomType(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.condom.type);
  }

  /**
   * Returns a random condom name.
   *
   * @example
   * faker.condom.condomDescription() // 'Condom with ribs and nops and stimulating gel for more pleasure for women. Warming and tingling at the same time.'
   *
   * @since 8.0.0
   */
  condomDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.condom.description
    );
  }

  /**
   * Returns a random condom material.
   *
   * @example
   * faker.condom.condomMaterial() // 'Latex'
   *
   * @since 8.0.0
   */
  condomMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.condom.material
    );
  }

  /**
   * Returns a random condom flavour.
   *
   * @example
   * faker.condom.condomFlavour() // 'Mint'
   *
   * @since 8.0.0
   */
  condomFlavour(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.condom.flavour
    );
  }

  /**
   * Returns a random condom lubricant.
   *
   * @example
   * faker.condom.condomLubricant() // 'Tingling lubricant'
   *
   * @since 8.0.0
   */
  condomLubricant(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.condom.lubricant
    );
  }

  /**
   * Returns a random condom size.
   *
   * @example
   * faker.condom.condomSize() // 'Normal'
   *
   * @since 8.0.0
   */
  condomSize(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.condom.size);
  }

  /**
   * Returns a random condom color.
   *
   * @example
   * faker.condom.condomColor() // 'Trasparent'
   *
   * @since 8.0.0
   */
  condomColor(): string {
    return this.faker.color.human();
  }
}
