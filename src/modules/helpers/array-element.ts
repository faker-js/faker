import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { int } from '../number/int';

/**
 * Returns random element from the given array.
 *
 * @template T The type of the elements to pick from.
 *
 * @param fakerCore The FakerCore to use.
 * @param array The array to pick the value from.
 *
 * @throws {FakerError} If the given array is empty.
 *
 * @example
 * arrayElement(fakerCore, ['cat', 'dog', 'mouse']) // 'dog'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function arrayElement<const T>(
  fakerCore: FakerCore,
  array: ReadonlyArray<T>
): T {
  if (array.length === 0) {
    throw new FakerError('Cannot get value from empty dataset.');
  }

  const index =
    array.length > 1 ? int(fakerCore, { max: array.length - 1 }) : 0;

  return array[index];
}
