import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random series.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * series(fakerCore) // 'Harry Potter'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function series(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.book.series);
}
