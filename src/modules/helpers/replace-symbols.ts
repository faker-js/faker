import type { FakerCore } from '../../core';
import { fakeDatatypeBoolean } from '../datatype/boolean';
import { fakeNumberInt } from '../number/int';
import { fakeHelpersArrayElement } from './array-element';

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
 * fakeHelpersReplaceSymbols(fakerCore) // ''
 * fakeHelpersReplaceSymbols(fakerCore, '#####') // '98441'
 * fakeHelpersReplaceSymbols(fakerCore, '?????') // 'ZYRQQ'
 * fakeHelpersReplaceSymbols(fakerCore, '*****') // '4Z3P7'
 * fakeHelpersReplaceSymbols(fakerCore, 'Your pin is: #?*#?*') // 'Your pin is: 0T85L1'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeHelpersReplaceSymbols(
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
      result += fakeNumberInt(fakerCore, 9);
    } else if (string.charAt(i) === '?') {
      result += fakeHelpersArrayElement(fakerCore, alpha);
    } else if (string.charAt(i) === '*') {
      result += fakeDatatypeBoolean(fakerCore)
        ? fakeHelpersArrayElement(fakerCore, alpha)
        : fakeNumberInt(fakerCore, 9);
    } else {
      result += string.charAt(i);
    }
  }

  return result;
}
