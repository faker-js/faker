import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random title.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeBookTitle(fakerCore) // 'Romeo and Juliet'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeBookTitle(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.book.title);
}
