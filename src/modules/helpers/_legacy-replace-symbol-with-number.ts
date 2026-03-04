import type { FakerCore } from '../../core';
import { int } from '../number/int';

/**
 * Parses the given string symbol by symbol and replaces the placeholders with digits (`0` - `9`).
 * `!` will be replaced by digits >=2 (`2` - `9`).
 *
 * Note: This method will be removed in v9.
 *
 * @internal
 *
 * @param fakerCore The Faker instance to use.
 * @param string The template string to parse. Defaults to `''`.
 * @param symbol The symbol to replace with digits. Defaults to `'#'`.
 *
 * @example
 * legacyReplaceSymbolWithNumber(fakerCore) // ''
 * legacyReplaceSymbolWithNumber(fakerCore, '#####') // '04812'
 * legacyReplaceSymbolWithNumber(fakerCore, '!####') // '27378'
 * legacyReplaceSymbolWithNumber(fakerCore, 'Your pin is: !####') // '29841'
 *
 * @since 8.4.0
 */
export function legacyReplaceSymbolWithNumber(
  fakerCore: FakerCore,
  string: string = '',
  symbol: string = '#'
): string {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) === symbol) {
      result += int(fakerCore, 9);
    } else if (string.charAt(i) === '!') {
      result += int(fakerCore, { min: 2, max: 9 });
    } else {
      result += string.charAt(i);
    }
  }

  return result;
}
