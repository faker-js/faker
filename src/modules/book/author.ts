import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random author name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * bookAuthor(fakerCore) // 'William Shakespeare'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function bookAuthor(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.book.author);
}
