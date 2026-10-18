import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random animal type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalType(fakerCore) // 'crocodile'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalType(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.type);
}
