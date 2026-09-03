import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random cetacean species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * cetacean(fakerCore) // 'Spinner Dolphin'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function cetacean(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.animal.cetacean);
}
