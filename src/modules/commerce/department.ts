import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a department inside a shop.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * commerceDepartment(fakerCore) // 'Garden'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function commerceDepartment(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.commerce.department);
}
