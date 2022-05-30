import type { Faker } from '../..';

export interface ChemicalElement {
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
   * faker.science.element() // { symbol: 'H', name: 'Hydrogen' }
   * faker.science.element() // { symbol: 'Xe', name: 'Xenon' }
   * faker.science.element() // { symbol: 'Ce', name: 'Cerium' }
   */
  element(): ChemicalElement {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.science.chemicalElement
    );
  }

  /**
   * Returns a random scientific unit.
   *
   * @example
   * faker.science.unit() // { name: 'meter', symbol: 'm' }
   * faker.science.unit() // { name: 'second', symbol: 's' }
   * faker.science.unit() // { name: 'mole', symbol: 'mol' }
   */
  unit(): Unit {
    return this.faker.helpers.arrayElement(this.faker.definitions.science.unit);
  }
}
