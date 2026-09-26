import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns an adjective describing a product.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * commerceProductAdjective(fakerCore) // 'Handcrafted'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function commerceProductAdjective(fakerCore: FakerCore): string {
  return helpersArrayElement(
    fakerCore,
    fakerCore.locale.commerce.product_name.adjective
  );
}
