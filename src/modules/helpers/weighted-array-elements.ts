import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { resolveWeightedCount, validateWeights } from './_weighted-array';

/**
 * Returns a weighted random subset of the given array without replacement, in selection order.
 * At each selection, an entry's probability is its weight divided by the total weight of the remaining entries.
 * Weights must be finite, positive numbers and do not need to sum to one.
 *
 * Each input entry can be selected only once. Entries with equal values are still separate entries,
 * so duplicate values in the input can appear more than once in the result.
 * The input array and its entries are not modified.
 *
 * @template T The type of the weighted entries to pick from.
 *
 * @param fakerCore The FakerCore to use.
 * @param array Array of weighted values to pick from.
 * @param array[].weight The finite, positive weight of the value.
 * @param array[].value The value to pick.
 * @param count Number or inclusive range of elements to pick. Must use safe integers.
 * If omitted, a random count between one and the array length is used.
 * Non-positive counts return an empty array; counts above the array length are limited to that length.
 * An empty input array returns an empty array.
 *
 * @throws {FakerError} If any weight is not finite and positive.
 * @throws {FakerError} If count or its range bounds are not safe integers, or the range is reversed.
 *
 * @see fakeHelpersWeightedArraySamples(fakerCore): For generating weighted samples with replacement.
 * @see fakeHelpersArrayElements(fakerCore): For generating samples without weights.
 *
 * @example
 * fakeHelpersWeightedArrayElements(fakerCore, [{ weight: 5, value: 'sunny' }, { weight: 4, value: 'rainy' }, { weight: 1, value: 'snowy' }], 2) // ['rainy', 'sunny']
 * fakeHelpersWeightedArrayElements(fakerCore, [{ weight: 0.8, value: 'featured' }, { weight: 0.2, value: 'regular' }], { min: 1, max: 2 }) // ['featured']
 * fakeHelpersWeightedArrayElements(fakerCore, [{ weight: 1, value: 'only' }], 5) // ['only']
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeHelpersWeightedArrayElements<
  const T extends { weight: number; value: unknown },
>(
  fakerCore: FakerCore,
  array: ReadonlyArray<T>,
  count?: NumberOrRange
): Array<T['value']> {
  validateWeights(array, 'weightedArrayElements');
  if (array.length === 0) {
    return [];
  }
  const size = Math.min(
    array.length,
    resolveWeightedCount(fakerCore, count ?? { min: 1, max: array.length })
  );
  if (size === 0) {
    return [];
  }
  if (array.length === 1) {
    return [array[0].value];
  }

  // Independent exponential arrival times produce successive weighted draws
  // without retrying already selected entries. Compare their logarithms to
  // avoid overflow/underflow for very large or very small positive weights.
  const ranked = array.map(({ weight, value }, index) => ({
    value,
    index,
    score:
      Math.log(-Math.log1p(-fakerCore.randomizer.next())) - Math.log(weight),
  }));
  ranked.sort((a, b) => {
    // A zero random draw gives -Infinity. Explicit equality also handles ties
    // between these values without subtracting infinities and producing NaN.
    return a.score === b.score ? a.index - b.index : a.score - b.score;
  });
  return ranked.slice(0, size).map(({ value }) => value);
}
