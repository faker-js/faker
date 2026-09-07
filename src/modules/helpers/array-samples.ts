import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { int } from '../number/int';
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
 *
 * @example
 * arraySamples(fakerCore, ['cat', 'dog', 'mouse'], 1) // ['mouse']
 * arraySamples(fakerCore, [1, 2, 3, 4, 5], 2) // [4, 2]
 * arraySamples(fakerCore, [1, 2, 3, 4, 5], { min: 2, max: 4 }) // [3, 5, 5]
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
  const result: T[] = [];

  if (array.length === 0 || count === 0) {
    return result;
  }

  const numElements = rangeToNumber(fakerCore, count);

  for (let i = 0; i < numElements; i++) {
    result.push(array[int(fakerCore, { min: 0, max: array.length - 1 })]);
  }

  return result;
}
