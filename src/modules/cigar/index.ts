import type { Faker } from '../..';

/**
 * Module to generate cigar related entries.
 */
export class CigarModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(CigarModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random cigar brand.
   *
   * @example
   * faker.cigar.cigarBrand() // 'Balmoral'
   *
   * @since 8.0.0
   */
  cigarBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.cigar.brand);
  }

  /**
   * Returns a random cigar brand.
   *
   * @example
   * faker.cigar.cigarLine() // 'AJ Fernandez "Aging Room"'
   *
   * @since 8.0.0
   */
  cigarLine(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.cigar.line);
  }

  /**
   * Returns a random cigar shape.
   *
   * @example
   * faker.cigar.cigarShape() // 'Robusto'
   *
   * @since 8.0.0
   */
  cigarShape(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.cigar.shape);
  }

  /**
   * Returns a random cigar strength.
   *
   * @example
   * faker.cigar.cigarStrength() // 'Delicate'
   *
   * @since 8.0.0
   */
  cigarStrength(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.cigar.strength
    );
  }

  /**
   * Returns a random cigar description.
   *
   * @example
   * faker.cigar.cigarDescription() // 'Raw comes with hints of herbs and in particular of tea. The smoke begins light and then continues in an evolution, especially between the first quarter and the middle, with a light cocoa taste and an increasing strength.'
   *
   * @since 8.0.0
   */
  cigarDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.cigar.description
    );
  }

  /**
   * Returns a random cigar origin.
   *
   * @example
   * faker.cigar.cigarOrigin() // 'Italy'
   * @since 8.0.0
   */
  cigarOrigin(): string {
    return this.faker.location.country();
  }
}
