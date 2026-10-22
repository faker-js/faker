import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random ingredient name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFoodIngredient(fakerCore) // 'butter'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFoodIngredient(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.food.ingredient);
}
