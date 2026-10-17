import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random rodent breed.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalRodent(fakerCore) // 'Cuscomys ashanika'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalRodent(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.rodent);
}
