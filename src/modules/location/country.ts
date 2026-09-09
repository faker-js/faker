import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random country name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * country(fakerCore) // 'Greece'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function country(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.location.country);
}
