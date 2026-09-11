import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random bear species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * bear(fakerCore) // 'Asian black bear'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function bear(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.animal.bear);
}
