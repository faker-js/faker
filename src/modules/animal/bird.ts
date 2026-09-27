import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random bird species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalBird(fakerCore) // 'Buller's Shearwater'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalBird(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.bird);
}
