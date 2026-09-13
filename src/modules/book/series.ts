import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random series.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * bookSeries(fakerCore) // 'Harry Potter'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function bookSeries(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.book.series);
}
