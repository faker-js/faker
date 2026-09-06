import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random lion species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * lion(fakerCore) // 'Northeast Congo Lion'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function lion(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.animal.lion);
}
