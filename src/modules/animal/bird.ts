import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random bird species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalBird(fakerCore) // 'Buller's Shearwater'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalBird(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.bird);
}
