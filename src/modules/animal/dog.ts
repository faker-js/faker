import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random dog breed.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalDog(fakerCore) // 'Irish Water Spaniel'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalDog(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.dog);
}
