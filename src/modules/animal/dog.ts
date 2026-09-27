import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random dog breed.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalDog(fakerCore) // 'Irish Water Spaniel'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalDog(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.dog);
}
