import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random genre.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * bookGenre(fakerCore) // 'Fantasy'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function bookGenre(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.book.genre);
}
