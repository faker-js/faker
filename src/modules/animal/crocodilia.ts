import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random crocodilian species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalCrocodilia(fakerCore) // 'Philippine Crocodile'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalCrocodilia(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.crocodilia);
}
