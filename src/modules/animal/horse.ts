import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random horse breed.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalHorse(fakerCore) // 'Swedish Warmblood'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalHorse(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.horse);
}
