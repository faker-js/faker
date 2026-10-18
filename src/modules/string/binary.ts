import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { fakeStringFromCharacters } from './from-characters';

/**
 * Returns a [binary](https://en.wikipedia.org/wiki/Binary_number) string.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.length The length of the string (excluding the prefix) to generate either as a fixed length or as a length range. Defaults to `1`.
 * @param options.prefix Prefix for the generated number. Defaults to `'0b'`.
 *
 * @see fakeNumberBinary(fakerCore): For generating a binary number (within a range).
 *
 * @example
 * fakeStringBinary(fakerCore) // '0b1'
 * fakeStringBinary(fakerCore, { length: 10 }) // '0b1101011011'
 * fakeStringBinary(fakerCore, { length: { min: 5, max: 10 } }) // '0b11101011'
 * fakeStringBinary(fakerCore, { prefix: '0b' }) // '0b1'
 * fakeStringBinary(fakerCore, { length: 10, prefix: 'bin_' }) // 'bin_1101011011'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeStringBinary(
  fakerCore: FakerCore,
  options: {
    /**
     * The length of the string (excluding the prefix) to generate either as a fixed length or as a length range.
     *
     * @default 1
     */
    length?: NumberOrRange;
    /**
     * Prefix for the generated number.
     *
     * @default '0b'
     */
    prefix?: string;
  } = {}
): string {
  const { prefix = '0b', length = 1 } = options;

  let result = prefix;
  result += fakeStringFromCharacters(fakerCore, ['0', '1'], length);
  return result;
}
