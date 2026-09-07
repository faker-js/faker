import type { FakerCore } from '../../core';
import { arrayElement } from './array-element';

/**
 * Returns a random key from the given object.
 *
 * @template T The type of the object to select from.
 *
 * @param fakerCore The FakerCore to use.
 * @param object The object to be used.
 *
 * @throws {FakerError} If the given object is empty.
 *
 * @example
 * objectKey(fakerCore, { Cheetah: 120, Falcon: 390, Snail: 0.03 }) // 'Falcon'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function objectKey<const T extends Record<string, unknown>>(
  fakerCore: FakerCore,
  object: T
): keyof T {
  const array: Array<keyof T> = Object.keys(object);
  return arrayElement(fakerCore, array);
}
