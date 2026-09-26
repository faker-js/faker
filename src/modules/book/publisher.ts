import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random publisher.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * bookPublisher(fakerCore) // 'Addison-Wesley'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function bookPublisher(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.book.publisher);
}
