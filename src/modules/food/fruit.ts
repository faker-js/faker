import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random fruit name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * foodFruit(fakerCore) // 'lemon'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function foodFruit(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.food.fruit);
}
