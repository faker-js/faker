import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random human-readable color name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * human(fakerCore) // 'red'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function human(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.color.human);
}
