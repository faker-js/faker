import type { Faker } from '../..';

/**
 * Module to generate science related entries.
 */
export class Science {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Science.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random element name.
   *
   * @example
   * faker.science.elementName() // 'Praseodymium'
   */
  elementName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.science.chemicalElement
    ).name;
  }

  /**
   * Returns a random element symbol.
   *
   * @example
   * faker.science.elementSymbol() // 'Rg'
   */
  elementSymbol(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.science.chemicalElement
    ).symbol;
  }

  /**
   * Returns a random scientific unit.
   *
   * @param options The options to use. Defaults to `{ long: true }`.
   * @param options.long Whether the long or short version of the unit should be returned. Defaults to `true`.
   *
   * @example
   * faker.science.unit() // 'second'
   * faker.science.unit({ long: false }) // 'Pa'
   * faker.science.unit({ long: true }) // 'joule'
   */
  unit(options: { long?: boolean } = {}): string {
    const { long = true } = options;
    if (long) {
      return this.faker.helpers.arrayElement(
        this.faker.definitions.science.longUnit
      );
    } else {
      return this.faker.helpers.arrayElement(
        this.faker.definitions.science.shortUnit
      );
    }
  }
}
