import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random country name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * locationCountry(fakerCore) // 'Greece'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function locationCountry(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.location.country);
}
