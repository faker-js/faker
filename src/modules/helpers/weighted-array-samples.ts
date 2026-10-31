import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import type { NumberOrRange } from '../../utils/types';
import { resolveWeightedCount, validateWeights } from './_weighted-array';

/**
 * Returns an array of weighted random elements sampled with replacement.
 * Each draw selects an entry with probability proportional to its weight; entries may appear more than once.
 * Weights must be finite, positive numbers and do not need to sum to one.
 * The input array and its entries are not modified.
 *
 * @template T The type of the weighted entries to pick from.
 *
 * @param fakerCore The FakerCore to use.
 * @param array Array of weighted values to pick from.
 * @param array[].weight The finite, positive weight of the value.
 * @param array[].value The value to pick.
 * @param count Number or inclusive range of elements to pick. Must use safe integers.
 * Non-positive counts return an empty array; counts can exceed the input length.
 *
 * @throws {FakerError} If the array is empty.
 * @throws {FakerError} If any weight is not finite and positive.
 * @throws {FakerError} If count or its range bounds are not safe integers, or the range is reversed.
 *
 * @see fakeHelpersWeightedArrayElements(fakerCore): For generating weighted samples without replacement.
 * @see fakeHelpersArraySamples(fakerCore): For generating samples without weights.
 *
 * @example
 * fakeHelpersWeightedArraySamples(fakerCore, [{ weight: 3, value: 'basic' }, { weight: 1, value: 'premium' }], 4) // ['basic', 'premium', 'basic', 'basic']
 * fakeHelpersWeightedArraySamples(fakerCore, [{ weight: 0.7, value: true }, { weight: 0.3, value: false }], { min: 2, max: 4 }) // [true, true, false]
 * fakeHelpersWeightedArraySamples(fakerCore, [{ weight: 1, value: 'only' }], 0) // []
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeHelpersWeightedArraySamples<
  const T extends { weight: number; value: unknown },
>(
  fakerCore: FakerCore,
  array: ReadonlyArray<T>,
  count: NumberOrRange
): Array<T['value']> {
  if (array.length === 0) {
    throw new FakerError('Cannot get value from empty dataset.');
  }
  validateWeights(array, 'weightedArraySamples');
  const size = resolveWeightedCount(fakerCore, count);
  if (size === 0) {
    return [];
  }
  if (array.length === 1) {
    return Array.from({ length: size }, () => array[0].value);
  }

  // Normalize once so a sum of individually finite weights cannot overflow.
  let maxWeight = 0;
  for (const { weight } of array) {
    maxWeight = Math.max(maxWeight, weight);
  }
  let total = 0;
  const cumulative: Array<{ ceiling: number; value: T['value'] }> = [];
  for (const { weight, value } of array) {
    const ceiling = total + weight / maxWeight;
    if (ceiling > total) {
      cumulative.push({ ceiling, value });
      total = ceiling;
    }
  }

  return Array.from({ length: size }, () => {
    const target = fakerCore.randomizer.next() * total;
    let low = 0;
    let high = cumulative.length - 1;
    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (target < cumulative[middle].ceiling) {
        high = middle;
      } else {
        low = middle + 1;
      }
    }
    return cumulative[low].value;
  });
}
