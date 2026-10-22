import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

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
 * fakeScienceUnit(fakerCore) // { name: 'meter', symbol: 'm' }
 * fakeScienceUnit(fakerCore) // { name: 'second', symbol: 's' }
 * fakeScienceUnit(fakerCore) // { name: 'mole', symbol: 'mol' }
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeScienceUnit(fakerCore: FakerCore): Unit {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.science.unit);
}
