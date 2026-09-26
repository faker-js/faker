import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random book format.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * bookFormat(fakerCore) // 'Hardcover'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function bookFormat(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.book.format);
}
