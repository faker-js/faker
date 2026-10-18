import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a short product name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCommerceProduct(fakerCore) // 'Computer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCommerceProduct(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.commerce.product_name.product
  );
}
