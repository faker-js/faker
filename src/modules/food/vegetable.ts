import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random vegetable name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFoodVegetable(fakerCore) // 'broccoli'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFoodVegetable(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.food.vegetable);
}
