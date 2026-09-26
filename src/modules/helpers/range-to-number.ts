import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { numberInt } from '../number/int';

/**
 * Helper method that converts the given number or range to a number.
 *
 * @param fakerCore The FakerCore to use.
 * @param numberOrRange The number or range to convert.
 * @param numberOrRange.min The minimum value for the range.
 * @param numberOrRange.max The maximum value for the range.
 *
 * @example
 * helpersRangeToNumber(fakerCore, 1) // 1
 * helpersRangeToNumber(fakerCore, { min: 1, max: 10 }) // 5
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function helpersRangeToNumber(
  fakerCore: FakerCore,
  numberOrRange: NumberOrRange
): number {
  if (typeof numberOrRange === 'number') {
    return numberOrRange;
  }

  return numberInt(fakerCore, numberOrRange);
}
