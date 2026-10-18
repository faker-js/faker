import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random lion species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalLion(fakerCore) // 'Northeast Congo Lion'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalLion(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.lion);
}
