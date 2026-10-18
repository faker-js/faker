import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random dish adjective.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFoodAdjective(fakerCore) // 'crispy'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFoodAdjective(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.food.adjective);
}
