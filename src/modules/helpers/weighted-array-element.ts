import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { float } from '../number/float';

/**
 * Returns a weighted random element from the given array. Each element of the array should be an object with two keys `weight` and `value`.
 *
 * - Each `weight` key should be a number representing the probability of selecting the value, relative to the sum of the weights. Weights can be any positive float or integer.
 * - Each `value` key should be the corresponding value.
 *
 * For example, if there are two values A and B, with weights 1 and 2 respectively, then the probability of picking A is 1/3 and the probability of picking B is 2/3.
 *
 * @template T The type of the elements to pick from.
 *
 * @param fakerCore The FakerCore to use.
 * @param array Array to pick the value from.
 * @param array[].weight The weight of the value.
 * @param array[].value The value to pick.
 *
 * @throws {FakerError} If the array is empty.
 * @throws {FakerError} If any element's weight is not a positive number.
 *
 * @example
 * weightedArrayElement(fakerCore, [{ weight: 5, value: 'sunny' }, { weight: 4, value: 'rainy' }, { weight: 1, value: 'snowy' }]) // 'sunny', 50% of the time, 'rainy' 40% of the time, 'snowy' 10% of the time
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function weightedArrayElement<const T>(
  fakerCore: FakerCore,
  array: ReadonlyArray<{
    /**
     * The weight of the value.
     */
    weight: number;
    /**
     * The value to pick.
     */
    value: T;
  }>
): T {
  if (array.length === 0) {
    throw new FakerError(
      'weightedArrayElement expects an array with at least one element'
    );
  }

  if (array.some((elt) => elt.weight <= 0)) {
    throw new FakerError(
      'weightedArrayElement expects an array of { weight, value } objects where weight is a positive number'
    );
  }

  const total = array.reduce((sum, { weight }) => sum + weight, 0);
  const random = float(fakerCore, {
    min: 0,
    max: total,
  });
  let current = 0;
  for (const { weight, value } of array) {
    current += weight;
    if (random < current) {
      return value;
    }
  }

  // In case of rounding errors, return the last element
  // oxlint-disable-next-line typescript/no-non-null-assertion
  return array.at(-1)!.value;
}
