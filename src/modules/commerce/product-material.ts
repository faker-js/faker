import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a material of a product.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * commerceProductMaterial(fakerCore) // 'Rubber'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function commerceProductMaterial(fakerCore: FakerCore): string {
  return helpersArrayElement(
    fakerCore,
    fakerCore.locale.commerce.product_name.material
  );
}
