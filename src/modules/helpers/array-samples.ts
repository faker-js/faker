import type { FakerCore } from '../../core';
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
 *
 * @example
 * arraySamples(fakerCore, ['cat', 'dog', 'mouse'], 1) // ['mouse']
 * arraySamples(fakerCore, [1, 2, 3, 4, 5], 2) // [4, 2]
 * arraySamples(fakerCore, [1, 2, 3, 4, 5], { min: 2, max: 4 }) // [3, 5, 5]
 * arraySamples(fakerCore, ["Heads", "Tails"], 4) // ["Heads", "Tails", "Tails", "Heads"]
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

  const numElements = rangeToNumber(fakerCore, count);

  if (array.length === 0 || numElements <= 0) {
    return result;
  }

  for (let i = 0; i < numElements; i++) {
    result.push(arrayElement(fakerCore, array));
  }

  return result;
}
