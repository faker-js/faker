import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random publisher.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeBookPublisher(fakerCore) // 'Addison-Wesley'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeBookPublisher(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.book.publisher);
}
