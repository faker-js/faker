import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random meat.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * foodMeat(fakerCore) // 'venison'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function foodMeat(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.food.meat);
}
