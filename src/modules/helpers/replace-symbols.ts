import type { FakerCore } from '../../core';
import { boolean } from '../datatype/boolean';
import { int } from '../number/int';
import { arrayElement } from './array-element';

/**
 * Parses the given string symbol by symbol and replaces the placeholder appropriately.
 *
 * - `#` will be replaced with a digit (`0` - `9`).
 * - `?` will be replaced with an upper letter ('A' - 'Z')
 * - and `*` will be replaced with either a digit or letter.
 *
 * @param fakerCore The FakerCore to use.
 * @param string The template string to parse. Defaults to `''`.
 *
 * @example
 * replaceSymbols(fakerCore) // ''
 * replaceSymbols(fakerCore, '#####') // '98441'
 * replaceSymbols(fakerCore, '?????') // 'ZYRQQ'
 * replaceSymbols(fakerCore, '*****') // '4Z3P7'
 * replaceSymbols(fakerCore, 'Your pin is: #?*#?*') // 'Your pin is: 0T85L1'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function replaceSymbols(
  fakerCore: FakerCore,
  string: string = ''
): string {
  const alpha = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) === '#') {
      result += int(fakerCore, 9);
    } else if (string.charAt(i) === '?') {
      result += arrayElement(fakerCore, alpha);
    } else if (string.charAt(i) === '*') {
      result += boolean(fakerCore)
        ? arrayElement(fakerCore, alpha)
        : int(fakerCore, 9);
    } else {
      result += string.charAt(i);
    }
  }

  return result;
}
