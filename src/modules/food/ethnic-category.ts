import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random food's ethnic category.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * foodEthnicCategory(fakerCore) // 'Italian'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function foodEthnicCategory(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.food.ethnic_category);
}
