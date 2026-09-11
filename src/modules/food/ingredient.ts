import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random ingredient name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * ingredient(fakerCore) // 'butter'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function ingredient(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.food.ingredient);
}
