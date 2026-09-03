import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a material of a product.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * productMaterial(fakerCore) // 'Rubber'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function productMaterial(fakerCore: FakerCore): string {
  return arrayElement(
    fakerCore,
    fakerCore.locale.commerce.product_name.material
  );
}
