import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random cat breed.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalCat(fakerCore) // 'Singapura'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalCat(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.cat);
}
