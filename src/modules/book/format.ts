import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random book format.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * format(fakerCore) // 'Hardcover'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function format(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.book.format);
}
