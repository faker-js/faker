import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random pet name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalPetName(fakerCore) // 'Coco'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalPetName(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.pet_name);
}
