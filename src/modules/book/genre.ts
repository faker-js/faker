import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random genre.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * genre(fakerCore) // 'Fantasy'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function genre(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.book.genre);
}
