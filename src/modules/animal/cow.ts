import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random cow species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalCow(fakerCore) // 'Brava'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalCow(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.cow);
}
