import type { Faker } from '../..';

export interface ChemicalElement {
  name: string;
  symbol: string;
}

export interface Unit {
  name: string;
  symbol: string;
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
   * Returns a random periodic table element.
   *
   * @example
   * faker.science.chemicalElement() // { symbol: 'H', name: 'Hydrogen' }
   * faker.science.chemicalElement() // { symbol: 'Xe', name: 'Xenon' }
   * faker.science.chemicalElement() // { symbol: 'Ce', name: 'Cerium' }
   */
  chemicalElement(): ChemicalElement {
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
