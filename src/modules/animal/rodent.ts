import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random rodent breed.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * rodent(fakerCore) // 'Cuscomys ashanika'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function rodent(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.animal.rodent);
}
