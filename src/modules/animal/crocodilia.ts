import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random crocodilian species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalCrocodilia(fakerCore) // 'Philippine Crocodile'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalCrocodilia(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.crocodilia);
}
