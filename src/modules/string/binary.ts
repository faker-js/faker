import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { stringFromCharacters } from './from-characters';

/**
 * Returns a [binary](https://en.wikipedia.org/wiki/Binary_number) string.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.length The length of the string (excluding the prefix) to generate either as a fixed length or as a length range. Defaults to `1`.
 * @param options.prefix Prefix for the generated number. Defaults to `'0b'`.
 *
 * @see numberBinary(fakerCore): For generating a binary number (within a range).
 *
 * @example
 * stringBinary(fakerCore) // '0b1'
 * stringBinary(fakerCore, { length: 10 }) // '0b1101011011'
 * stringBinary(fakerCore, { length: { min: 5, max: 10 } }) // '0b11101011'
 * stringBinary(fakerCore, { prefix: '0b' }) // '0b1'
 * stringBinary(fakerCore, { length: 10, prefix: 'bin_' }) // 'bin_1101011011'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function stringBinary(
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
  result += stringFromCharacters(fakerCore, ['0', '1'], length);
  return result;
}
