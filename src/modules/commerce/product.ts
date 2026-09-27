import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a short product name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * commerceProduct(fakerCore) // 'Computer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function commerceProduct(fakerCore: FakerCore): string {
  return helpersArrayElement(
    fakerCore,
    fakerCore.locale.commerce.product_name.product
  );
}
