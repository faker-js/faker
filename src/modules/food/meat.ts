import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random meat.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * meat(fakerCore) // 'venison'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function meat(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.food.meat);
}
