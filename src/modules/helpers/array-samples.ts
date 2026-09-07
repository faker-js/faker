import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import type { NumberOrRange } from '../../utils/types';
import { arrayElement } from './array-element';
import { rangeToNumber } from './range-to-number';

/**
 * Returns an array of elements sampled from the given array with replacement.
 * Elements may appear more than once.
 *
 * @template T The type of the elements to pick from.
 *
 * @param fakerCore The FakerCore to use.
 * @param array Array to pick the value from.
 * @param count Number or range of elements to pick.
 *     When count is 0 or less, an empty array is returned.
 *
 * @throws {FakerError} If the given array is empty.
 *
 * @example
 * arraySamples(fakerCore, ["Heads", "Tails"], 4) // ["Heads", "Tails", "Tails", "Heads"]
 * arraySamples(fakerCore, [1, 2, 3], { min: 2, max: 5 }) // [2, 1, 3, 3, 1]
 * arraySamples(fakerCore, ["a", "b", "c"], 0) // []
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function arraySamples<const T>(
  fakerCore: FakerCore,
  array: ReadonlyArray<T>,
  count: NumberOrRange
): T[] {
  if (array.length === 0) {
    throw new FakerError('Cannot get value from empty dataset.');
  }
  const result: T[] = [];

  const numElements = rangeToNumber(fakerCore, count);

  if (numElements <= 0) {
    return result;
  }

  for (let i = 0; i < numElements; i++) {
    result.push(arrayElement(fakerCore, array));
  }

  return result;
}
