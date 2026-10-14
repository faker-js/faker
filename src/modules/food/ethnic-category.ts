import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random food's ethnic category.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFoodEthnicCategory(fakerCore) // 'Italian'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFoodEthnicCategory(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.food.ethnic_category
  );
}
