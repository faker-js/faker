import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random dish adjective.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * foodAdjective(fakerCore) // 'crispy'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function foodAdjective(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.food.adjective);
}
