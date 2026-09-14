import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a short product name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * product(fakerCore) // 'Computer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function product(fakerCore: FakerCore): string {
  return arrayElement(
    fakerCore,
    fakerCore.locale.commerce.product_name.product
  );
}
