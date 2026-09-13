import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random publisher.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * publisher(fakerCore) // 'Addison-Wesley'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function publisher(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.book.publisher);
}
