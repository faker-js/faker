import type { FakerCore } from '../../core';
import { objectKey } from './object-key';

/**
 * Returns a random `[key, value]` pair from the given object.
 *
 * @template T The type of the object to select from.
 *
 * @param fakerCore The FakerCore to use.
 * @param object The object to be used.
 *
 * @throws {FakerError} If the given object is empty.
 *
 * @example
 * objectEntry(fakerCore, { Cheetah: 120, Falcon: 390, Snail: 0.03 }) // ['Snail', 0.03]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function objectEntry<const T extends Record<string, unknown>>(
  fakerCore: FakerCore,
  object: T
): [keyof T, T[keyof T]] {
  const key = objectKey(fakerCore, object);
  return [key, object[key]];
}
