import type { FakerCore } from '../../core';
import type { LiteralUnion } from '../../internal/types';
import type { Casing, NumberOrRange } from '../../utils/types';
import { rangeToNumber } from '../helpers/range-to-number';
import { fromCharacters } from './from-characters';

/**
 * Generating a string consisting of letters in the English alphabet.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Either the length of the string to generate or the optional options object.
 * @param options.length The length of the string to generate either as a fixed length or as a length range. Defaults to `1`.
 * @param options.casing The casing of the characters. Defaults to `'mixed'`.
 * @param options.exclude An array with characters which should be excluded in the generated string. Defaults to `[]`.
 *
 * @example
 * alpha(fakerCore) // 'b'
 * alpha(fakerCore, 10) // 'fEcAaCVbaR'
 * alpha(fakerCore, { length: { min: 5, max: 10 } }) // 'HcVrCf'
 * alpha(fakerCore, { casing: 'lower' }) // 'r'
 * alpha(fakerCore, { exclude: ['W'] }) // 'Z'
 * alpha(fakerCore, { length: 5, casing: 'upper', exclude: ['A'] }) // 'DTCIC'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function alpha(
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
         * An array with characters which should be excluded in the generated string.
         *
         * @default []
         */
        exclude?: ReadonlyArray<LiteralUnion<AlphaChar>> | string;
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

  let charsArray: string[];
  switch (casing) {
    case 'upper': {
      charsArray = [...UPPER_CHARS];
      break;
    }

    case 'lower': {
      charsArray = [...LOWER_CHARS];
      break;
    }

    case 'mixed': {
      charsArray = [...LOWER_CHARS, ...UPPER_CHARS];
      break;
    }
  }

  charsArray = charsArray.filter((elem) => !exclude.includes(elem));

  return fromCharacters(fakerCore, charsArray, length);
}
