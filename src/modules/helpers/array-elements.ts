import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { fakeNumberInt } from '../number/int';
import { fakeHelpersRangeToNumber } from './range-to-number';
import { fakeHelpersShuffle } from './shuffle';

/**
 * Returns a subset with random elements of the given array in random order.
 *
 * @template T The type of the elements to pick from.
 *
 * @param fakerCore The FakerCore to use.
 * @param array Array to pick the value from.
 * @param count Number or range of elements to pick.
 *    When not provided, random number of elements will be picked.
 *    When value exceeds array boundaries, it will be limited to stay inside.
 *
 * @see fakeHelpersArraySamples(fakerCore): For generating an array of elements with replacement.
 *
 * @example
 * fakeHelpersArrayElements(fakerCore, ['cat', 'dog', 'mouse']) // ['mouse', 'cat']
 * fakeHelpersArrayElements(fakerCore, [1, 2, 3, 4, 5], 2) // [4, 2]
 * fakeHelpersArrayElements(fakerCore, [1, 2, 3, 4, 5], { min: 2, max: 4 }) // [3, 5, 1]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeHelpersArrayElements<const T>(
  fakerCore: FakerCore,
  array: ReadonlyArray<T>,
  count?: NumberOrRange
): T[] {
  if (array.length === 0) {
    return [];
  }

  const numElements = fakeHelpersRangeToNumber(
    fakerCore,
    count ?? { min: 1, max: array.length }
  );

  if (numElements >= array.length) {
    return fakeHelpersShuffle(fakerCore, array);
  } else if (numElements <= 0) {
    return [];
  }

  const arrayCopy = [...array];
  let i = array.length;
  const min = i - numElements;

  // Shuffle the last `count` elements of the array
  while (i-- > min) {
    const index = fakeNumberInt(fakerCore, i);
    const temp = arrayCopy[index];
    arrayCopy[index] = arrayCopy[i];
    arrayCopy[i] = temp;
  }

  return arrayCopy.slice(min);
}
