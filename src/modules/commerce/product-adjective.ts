import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns an adjective describing a product.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * productAdjective(fakerCore) // 'Handcrafted'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function productAdjective(fakerCore: FakerCore): string {
  return arrayElement(
    fakerCore,
    fakerCore.locale.commerce.product_name.adjective
  );
}
