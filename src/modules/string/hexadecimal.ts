import type { FakerCore } from '../../core';
import type { Casing, NumberOrRange } from '../../utils/types';
import { fakeHelpersRangeToNumber } from '../helpers/range-to-number';
import { fakeStringFromCharacters } from './from-characters';

const HEX_CHARS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];

/**
 * Returns a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) string.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.length The length of the string (excluding the prefix) to generate either as a fixed length or as a length range. Defaults to `1`.
 * @param options.casing Casing of the generated number. Defaults to `'mixed'`.
 * @param options.prefix Prefix for the generated number. Defaults to `'0x'`.
 *
 * @example
 * fakeStringHexadecimal(fakerCore) // '0xB'
 * fakeStringHexadecimal(fakerCore, { length: 10 }) // '0xaE13d044cB'
 * fakeStringHexadecimal(fakerCore, { length: { min: 5, max: 10 } }) // '0x7dEf7FCD'
 * fakeStringHexadecimal(fakerCore, { prefix: '0x' }) // '0xE'
 * fakeStringHexadecimal(fakerCore, { casing: 'lower' }) // '0xf'
 * fakeStringHexadecimal(fakerCore, { length: 10, prefix: '#' }) // '#f12a974eB1'
 * fakeStringHexadecimal(fakerCore, { length: 10, casing: 'upper' }) // '0xE3F38014FB'
 * fakeStringHexadecimal(fakerCore, { casing: 'lower', prefix: '' }) // 'd'
 * fakeStringHexadecimal(fakerCore, { length: 10, casing: 'mixed', prefix: '0x' }) // '0xAdE330a4D1'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeStringHexadecimal(
  fakerCore: FakerCore,
  options: {
    /**
     * The length of the string (excluding the prefix) to generate either as a fixed length or as a length range.
     *
     * @default 1
     */
    length?: NumberOrRange;
    /**
     * Casing of the generated number.
     *
     * @default 'mixed'
     */
    casing?: Casing;
    /**
     * Prefix for the generated number.
     *
     * @default '0x'
     */
    prefix?: string;
  } = {}
): string {
  const { casing = 'mixed', prefix = '0x' } = options;
  const length = fakeHelpersRangeToNumber(fakerCore, options.length ?? 1);
  if (length <= 0) {
    return prefix;
  }

  let wholeString = fakeStringFromCharacters(fakerCore, HEX_CHARS, length);

  if (casing === 'upper') {
    wholeString = wholeString.toUpperCase();
  } else if (casing === 'lower') {
    wholeString = wholeString.toLowerCase();
  }

  return `${prefix}${wholeString}`;
}
