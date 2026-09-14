import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random vegetable name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * vegetable(fakerCore) // 'broccoli'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function vegetable(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.food.vegetable);
}
