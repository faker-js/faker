import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random author name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeBookAuthor(fakerCore) // 'William Shakespeare'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeBookAuthor(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.book.author);
}
