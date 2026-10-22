import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random spice name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFoodSpice(fakerCore) // 'chilli'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFoodSpice(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.food.spice);
}
