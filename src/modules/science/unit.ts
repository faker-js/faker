import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

export interface Unit {
  /**
   * The long version of the unit (e.g. `meter`).
   */
  name: string;
  /**
   * The short version/abbreviation of the unit (e.g. `Pa`).
   */
  symbol: string;
}

/**
 * Returns a random scientific unit.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * scienceUnit(fakerCore) // { name: 'meter', symbol: 'm' }
 * scienceUnit(fakerCore) // { name: 'second', symbol: 's' }
 * scienceUnit(fakerCore) // { name: 'mole', symbol: 'mol' }
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function scienceUnit(fakerCore: FakerCore): Unit {
  return helpersArrayElement(fakerCore, fakerCore.locale.science.unit);
}
