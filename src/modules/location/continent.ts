import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random continent name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * continent(fakerCore) // 'Asia'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function continent(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.location.continent);
}
