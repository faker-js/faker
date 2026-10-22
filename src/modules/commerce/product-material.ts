import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a material of a product.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCommerceProductMaterial(fakerCore) // 'Rubber'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCommerceProductMaterial(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.commerce.product_name.material
  );
}
