import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random fruit name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFoodFruit(fakerCore) // 'lemon'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFoodFruit(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.food.fruit);
}
