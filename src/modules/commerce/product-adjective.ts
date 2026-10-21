import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns an adjective describing a product.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCommerceProductAdjective(fakerCore) // 'Handcrafted'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCommerceProductAdjective(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.commerce.product_name.adjective
  );
}
