import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * The possible definitions related to elements.
 */
export interface ChemicalElement {
  /**
   * The symbol for the element (e.g. `'He'`).
   */
  symbol: string;
  /**
   * The name for the element (e.g. `'Cerium'`).
   */
  name: string;
  /**
   * The atomic number for the element (e.g. `52`).
   */
  atomicNumber: number;
}

/**
 * Returns a random periodic table element.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * chemicalElement(fakerCore) // { symbol: 'H', name: 'Hydrogen', atomicNumber: 1 }
 * chemicalElement(fakerCore) // { symbol: 'Xe', name: 'Xenon', atomicNumber: 54 }
 * chemicalElement(fakerCore) // { symbol: 'Ce', name: 'Cerium', atomicNumber: 58 }
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function chemicalElement(fakerCore: FakerCore): ChemicalElement {
  return arrayElement(fakerCore, fakerCore.locale.science.chemical_element);
}
