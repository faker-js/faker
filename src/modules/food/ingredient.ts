import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random ingredient name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * foodIngredient(fakerCore) // 'butter'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function foodIngredient(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.food.ingredient);
}
