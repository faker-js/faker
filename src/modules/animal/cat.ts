import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random cat breed.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalCat(fakerCore) // 'Singapura'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalCat(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.cat);
}
