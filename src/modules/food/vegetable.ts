import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random vegetable name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * foodVegetable(fakerCore) // 'broccoli'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function foodVegetable(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.food.vegetable);
}
