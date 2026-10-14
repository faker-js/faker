import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { fakeHelpersRangeToNumber } from '../helpers/range-to-number';
import { fakeNumberInt } from '../number/int';

/**
 * Returns a string containing UTF-16 chars between 33 and 125 (`!` to `}`).
 *
 * @param fakerCore The FakerCore to use.
 * @param length The length of the string to generate either as a fixed length or as a length range. Defaults to `10`.
 * @param length.min The minimum length of the string to generate.
 * @param length.max The maximum length of the string to generate.
 *
 * @example
 * fakeStringSample(fakerCore) // 'Zo!.:*e>wR'
 * fakeStringSample(fakerCore, 5) // '6Bye8'
 * fakeStringSample(fakerCore, { min: 5, max: 10 }) // 'FeKunG'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeStringSample(
  fakerCore: FakerCore,
  length: NumberOrRange = 10
): string {
  length = fakeHelpersRangeToNumber(fakerCore, length);

  const charCodeOption = {
    min: 33,
    max: 125,
  };

  let returnString = '';

  while (returnString.length < length) {
    returnString += String.fromCodePoint(
      fakeNumberInt(fakerCore, charCodeOption)
    );
  }

  return returnString;
}
