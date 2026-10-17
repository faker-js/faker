import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random series.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeBookSeries(fakerCore) // 'Harry Potter'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeBookSeries(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.book.series);
}
