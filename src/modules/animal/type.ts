import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random animal type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalType(fakerCore) // 'crocodile'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalType(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.type);
}
