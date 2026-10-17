import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random rabbit species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalRabbit(fakerCore) // 'Florida White'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalRabbit(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.rabbit);
}
