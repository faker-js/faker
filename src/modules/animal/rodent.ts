import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random rodent breed.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalRodent(fakerCore) // 'Cuscomys ashanika'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalRodent(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.rodent);
}
