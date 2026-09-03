import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a department inside a shop.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * department(fakerCore) // 'Garden'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function department(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.commerce.department);
}
