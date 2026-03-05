import { ModuleBase } from '../../internal/module-base';
import type { ChemicalElement } from './chemical-element';
import type { Unit } from './unit';

/**
 * Module to generate science related entries.
 *
 * ### Overview
 *
 * Both methods in this module return objects rather than strings. For example, you can use `faker.science.chemicalElement().name` to pick out the specific property you need.
 */
export class ScienceModule extends ModuleBase {
  /**
   * Returns a random periodic table element.
   *
   * @example
   * faker.science.chemicalElement() // { symbol: 'H', name: 'Hydrogen', atomicNumber: 1 }
   * faker.science.chemicalElement() // { symbol: 'Xe', name: 'Xenon', atomicNumber: 54 }
   * faker.science.chemicalElement() // { symbol: 'Ce', name: 'Cerium', atomicNumber: 58 }
   *
   * @since 7.2.0
   */
  chemicalElement(): ChemicalElement {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.science.chemical_element
    );
  }

  /**
   * Returns a random scientific unit.
   *
   * @example
   * faker.science.unit() // { name: 'meter', symbol: 'm' }
   * faker.science.unit() // { name: 'second', symbol: 's' }
   * faker.science.unit() // { name: 'mole', symbol: 'mol' }
   *
   * @since 7.2.0
   */
  unit(): Unit {
    return this.faker.helpers.arrayElement(this.faker.definitions.science.unit);
  }
}
