import type { FakerCore } from '../../core';
import type { LiteralUnion } from '../../internal/types';
import type { Casing, NumberOrRange } from '../../utils/types';
import { rangeToNumber } from '../helpers/range-to-number';
import type { AlphaNumericChar } from './_types';
import { DIGIT_CHARS, LOWER_CHARS, UPPER_CHARS } from './_types';
import { fromCharacters } from './from-characters';

/**
 * Generating a string consisting of alpha characters and digits.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Either the length of the string to generate or the optional options object.
 * @param options.length The length of the string to generate either as a fixed length or as a length range. Defaults to `1`.
 * @param options.casing The casing of the characters. Defaults to `'mixed'`.
 * @param options.exclude An array of characters and digits which should be excluded in the generated string. Defaults to `[]`.
 *
 * @example
 * alphanumeric(fakerCore) // '2'
 * alphanumeric(fakerCore, 5) // '3e5V7'
 * alphanumeric(fakerCore, { length: { min: 5, max: 10 } }) // 'muaApG'
 * alphanumeric(fakerCore, { casing: 'upper' }) // 'A'
 * alphanumeric(fakerCore, { exclude: ['W'] }) // 'r'
 * alphanumeric(fakerCore, { length: 5, exclude: ["a"] }) // 'x1Z7f'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function alphanumeric(
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
         * The casing of the characters.
         *
         * @default 'mixed'
         */
        casing?: Casing;
        /**
         * An array of characters and digits which should be excluded in the generated string.
         *
         * @default []
         */
        exclude?: ReadonlyArray<LiteralUnion<AlphaNumericChar>> | string;
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

  const { casing = 'mixed' } = options;
  let { exclude = [] } = options;

  if (typeof exclude === 'string') {
    exclude = [...exclude];
  }

  let charsArray = [...DIGIT_CHARS];

  switch (casing) {
    case 'upper': {
      charsArray.push(...UPPER_CHARS);
      break;
    }

    case 'lower': {
      charsArray.push(...LOWER_CHARS);
      break;
    }

    case 'mixed': {
      charsArray.push(...LOWER_CHARS, ...UPPER_CHARS);
      break;
    }
  }

  charsArray = charsArray.filter((elem) => !exclude.includes(elem));

  return fromCharacters(fakerCore, charsArray, length);
}
