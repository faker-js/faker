import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random book format.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeBookFormat(fakerCore) // 'Hardcover'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeBookFormat(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.book.format);
}
