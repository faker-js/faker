import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random food's ethnic category.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * ethnicCategory(fakerCore) // 'Italian'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function ethnicCategory(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.food.ethnic_category);
}
