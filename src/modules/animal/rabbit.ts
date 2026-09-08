import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random rabbit species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * rabbit(fakerCore) // 'Florida White'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function rabbit(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.animal.rabbit);
}
