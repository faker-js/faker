import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random bird species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * bird(fakerCore) // 'Buller's Shearwater'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function bird(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.animal.bird);
}
