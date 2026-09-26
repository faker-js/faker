import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random spice name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * foodSpice(fakerCore) // 'chilli'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function foodSpice(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.food.spice);
}
