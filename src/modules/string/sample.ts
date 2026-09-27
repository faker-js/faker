import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { helpersRangeToNumber } from '../helpers/range-to-number';
import { numberInt } from '../number/int';

/**
 * Returns a string containing UTF-16 chars between 33 and 125 (`!` to `}`).
 *
 * @param fakerCore The FakerCore to use.
 * @param length The length of the string to generate either as a fixed length or as a length range. Defaults to `10`.
 * @param length.min The minimum length of the string to generate.
 * @param length.max The maximum length of the string to generate.
 *
 * @example
 * stringSample(fakerCore) // 'Zo!.:*e>wR'
 * stringSample(fakerCore, 5) // '6Bye8'
 * stringSample(fakerCore, { min: 5, max: 10 }) // 'FeKunG'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function stringSample(
  fakerCore: FakerCore,
  length: NumberOrRange = 10
): string {
  length = helpersRangeToNumber(fakerCore, length);

  const charCodeOption = {
    min: 33,
    max: 125,
  };

  let returnString = '';

  while (returnString.length < length) {
    returnString += String.fromCodePoint(numberInt(fakerCore, charCodeOption));
  }

  return returnString;
}
