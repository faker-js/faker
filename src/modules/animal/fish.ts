import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random fish species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalFish(fakerCore) // 'Mandarin fish'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalFish(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.fish);
}
