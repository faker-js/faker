import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random insect species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalInsect(fakerCore) // 'Pyramid ant'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalInsect(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.insect);
}
