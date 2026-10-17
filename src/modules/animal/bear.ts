import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random bear species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalBear(fakerCore) // 'Asian black bear'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalBear(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.bear);
}
