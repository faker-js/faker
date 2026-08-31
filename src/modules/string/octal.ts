import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { fromCharacters } from './from-characters';

/**
 * Returns an [octal](https://en.wikipedia.org/wiki/Octal) string.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.length The length of the string (excluding the prefix) to generate either as a fixed length or as a length range. Defaults to `1`.
 * @param options.prefix Prefix for the generated number. Defaults to `'0o'`.
 *
 * @see numberOctal(fakerCore): For generating an octal number (within a range).
 *
 * @example
 * octal(fakerCore) // '0o3'
 * octal(fakerCore, { length: 10 }) // '0o1526216210'
 * octal(fakerCore, { length: { min: 5, max: 10 } }) // '0o15263214'
 * octal(fakerCore, { prefix: '0o' }) // '0o7'
 * octal(fakerCore, { length: 10, prefix: 'oct_' }) // 'oct_1542153414'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function octal(
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
     * @default '0o'
     */
    prefix?: string;
  } = {}
): string {
  const { prefix = '0o' } = options;

  let result = prefix;
  result += fromCharacters(
    fakerCore,
    ['0', '1', '2', '3', '4', '5', '6', '7'],
    options.length ?? 1
  );
  return result;
}
