import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import type { LiteralUnion } from '../../internal/types';
import type { NumberOrRange } from '../../utils/types';
import { arrayElement } from '../helpers/array-element';
import { rangeToNumber } from '../helpers/range-to-number';
import type { NumericChar } from './_types';
import { DIGIT_CHARS } from './_types';
import { fromCharacters } from './from-characters';

/**
 * Generates a given length string of digits.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Either the length of the string to generate or the optional options object.
 * @param options.length The length of the string to generate either as a fixed length or as a length range. Defaults to `1`.
 * @param options.allowLeadingZeros Whether leading zeros are allowed or not. Defaults to `true`.
 * @param options.exclude An array of digits which should be excluded in the generated string. Defaults to `[]`.
 *
 * @throws {FakerError} If no digits are available after applying `exclude` and `allowLeadingZeros`.
 *
 * @see numberInt(fakerCore): For generating a number (within a range).
 *
 * @example
 * numeric(fakerCore) // '2'
 * numeric(fakerCore, 5) // '31507'
 * numeric(fakerCore, 42) // '06434563150765416546479875435481513188548'
 * numeric(fakerCore, { length: { min: 5, max: 10 } }) // '197089478'
 * numeric(fakerCore, { length: 42, allowLeadingZeros: false }) // '72564846278453876543517840713421451546115'
 * numeric(fakerCore, { length: 6, exclude: ['0'] }) // '943228'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function numeric(
  fakerCore: FakerCore,
  options:
    | number
    | {
        /**
         * The length of the string to generate either as a fixed length or as a length range.
         *
         * @default 1
         */
        length?: NumberOrRange;
        /**
         * Whether leading zeros are allowed or not.
         *
         * @default true
         */
        allowLeadingZeros?: boolean;
        /**
         * An array of digits which should be excluded in the generated string.
         *
         * @default []
         */
        exclude?: ReadonlyArray<LiteralUnion<NumericChar>> | string;
      } = {}
): string {
  if (typeof options === 'number') {
    options = {
      length: options,
    };
  }

  const length = rangeToNumber(fakerCore, options.length ?? 1);
  if (length <= 0) {
    return '';
  }

  const { allowLeadingZeros = true } = options;
  let { exclude = [] } = options;

  if (typeof exclude === 'string') {
    exclude = [...exclude];
  }

  const allowedDigits = DIGIT_CHARS.filter((digit) => !exclude.includes(digit));

  if (
    allowedDigits.length === 0 ||
    (!allowLeadingZeros &&
      allowedDigits.length === 1 &&
      allowedDigits[0] === '0')
  ) {
    throw new FakerError(
      'Unable to generate numeric string, because all possible digits are excluded.'
    );
  }

  let result = '';

  if (!allowLeadingZeros && !exclude.includes('0')) {
    result += arrayElement(
      fakerCore,
      allowedDigits.filter((digit) => digit !== '0')
    );
  }

  result += fromCharacters(fakerCore, allowedDigits, length - result.length);

  return result;
}
