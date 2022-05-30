import type { Faker } from '../..';

export interface Element {
  name: string;
  symbol: string;
}

export interface Unit {
  long: string;
  short: string;
}

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
   * Returns a random element.
   *
   * @example
   * faker.science.element() // { name: 'Hydrogen', symbol: 'H' }
   * faker.science.element() // { name: 'Xenon', symbol: 'Xe' }
   * faker.science.element() // { name: 'Cerium', symbol: 'Ce' }
   */
  element(): Element {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.science.chemicalElement
    );
  }

  /**
   * Returns a random scientific unit.
   *
   * @example
   * faker.science.unit() // { long: 'meter', short: 'm' }
   * faker.science.unit() // { long: 'second', short: 's' }
   * faker.science.unit() // { long: 'mole', short: 'mol' }
   */
  unit(): Unit {
    const index = this.faker.datatype.number({
      min: 0,
      max: this.faker.definitions.science.unit.length - 1,
    });
    return this.faker.definitions.science.unit[index];
  }
}
