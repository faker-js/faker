import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random continent name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * locationContinent(fakerCore) // 'Asia'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function locationContinent(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.location.continent);
}
