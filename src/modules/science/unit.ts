import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random scientific unit.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * unit(fakerCore) // { name: 'meter', symbol: 'm' }
 * unit(fakerCore) // { name: 'second', symbol: 's' }
 * unit(fakerCore) // { name: 'mole', symbol: 'mol' }
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function unit(fakerCore: FakerCore): Unit {
  return arrayElement(fakerCore, fakerCore.locale.science.unit);
}
