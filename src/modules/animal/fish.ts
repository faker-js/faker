import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random fish species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalFish(fakerCore) // 'Mandarin fish'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalFish(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.fish);
}
