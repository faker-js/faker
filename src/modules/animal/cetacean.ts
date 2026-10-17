import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random cetacean species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalCetacean(fakerCore) // 'Spinner Dolphin'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalCetacean(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.cetacean);
}
