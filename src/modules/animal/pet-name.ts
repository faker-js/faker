import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random pet name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalPetName(fakerCore) // 'Coco'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalPetName(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.pet_name);
}
