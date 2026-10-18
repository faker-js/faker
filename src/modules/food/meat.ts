import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random meat.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFoodMeat(fakerCore) // 'venison'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFoodMeat(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.food.meat);
}
