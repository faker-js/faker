import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random bear species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalBear(fakerCore) // 'Asian black bear'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalBear(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.bear);
}
