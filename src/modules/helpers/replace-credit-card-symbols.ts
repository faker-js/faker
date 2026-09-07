import type { FakerCore } from '../../core';
import { int } from '../number/int';
import { legacyReplaceSymbolWithNumber } from './_legacy-replace-symbol-with-number';
import { luhnCheckValue } from './_luhn-check';

/**
 * Replaces the regex like expressions in the given string with matching values.
 *
 * Note: This method will be removed in v9.
 *
 * Supported patterns:
 * - `.{times}` => Repeat the character exactly `times` times.
 * - `.{min,max}` => Repeat the character `min` to `max` times.
 * - `[min-max]` => Generate a number between min and max (inclusive).
 *
 * @internal
 *
 * @param fakerCore The Faker instance to use.
 * @param string The template string to parse.
 *
 * @example
 * legacyRegexpStringParse(fakerCore) // ''
 * legacyRegexpStringParse(fakerCore, '#{5}') // '#####'
 * legacyRegexpStringParse(fakerCore, '#{2,9}') // '#######'
 * legacyRegexpStringParse(fakerCore, '[500-15000]') // '8375'
 * legacyRegexpStringParse(fakerCore, '#{3}test[1-5]') // '###test3'
 *
 * @since 5.0.0
 */
function legacyRegexpStringParse(
  fakerCore: FakerCore,
  string: string = ''
): string {
  // Deal with range repeat `{min,max}`
  const RANGE_REP_REG = /(.)\{(\d+),(\d+)\}/;
  const REP_REG = /(.)\{(\d+)\}/;
  const RANGE_REG = /\[(\d+)-(\d+)\]/;
  let min: number;
  let max: number;
  let tmp: number;
  let repetitions: number;
  let token = RANGE_REP_REG.exec(string);
  while (token != null) {
    min = Number.parseInt(token[2]);
    max = Number.parseInt(token[3]);
    // switch min and max
    if (min > max) {
      tmp = max;
      max = min;
      min = tmp;
    }

    repetitions = int(fakerCore, { min, max });
    string =
      string.slice(0, token.index) +
      token[1].repeat(repetitions) +
      string.slice(token.index + token[0].length);
    token = RANGE_REP_REG.exec(string);
  }

  // Deal with repeat `{num}`
  token = REP_REG.exec(string);
  while (token != null) {
    repetitions = Number.parseInt(token[2]);
    string =
      string.slice(0, token.index) +
      token[1].repeat(repetitions) +
      string.slice(token.index + token[0].length);
    token = REP_REG.exec(string);
  }
  // Deal with range `[min-max]` (only works with numbers for now)

  token = RANGE_REG.exec(string);
  while (token != null) {
    min = Number.parseInt(token[1]); // This time we are not capturing the char before `[]`
    max = Number.parseInt(token[2]);
    // switch min and max
    if (min > max) {
      tmp = max;
      max = min;
      min = tmp;
    }

    string =
      string.slice(0, token.index) +
      int(fakerCore, { min, max }).toString() +
      string.slice(token.index + token[0].length);
    token = RANGE_REG.exec(string);
  }

  return string;
}

/**
 * Replaces the symbols and patterns in a credit card schema including Luhn checksum.
 *
 * This method supports both range patterns `[4-9]` as well as the patterns used by `replaceSymbolWithNumber()`.
 * `L` will be replaced with the appropriate Luhn checksum.
 *
 * @param fakerCore The FakerCore to use.
 * @param string The credit card format pattern. Defaults to `'6453-####-####-####-###L'`.
 * @param symbol The symbol to replace with a digit. Defaults to `'#'`.
 *
 * @example
 * replaceCreditCardSymbols(fakerCore) // '6453-4876-8626-8995-3771'
 * replaceCreditCardSymbols(fakerCore, '1234-[4-9]-##!!-L') // '1234-9-5298-2'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function replaceCreditCardSymbols(
  fakerCore: FakerCore,
  string: string = '6453-####-####-####-###L',
  symbol: string = '#'
): string {
  // default values required for calling method without arguments

  string = legacyRegexpStringParse(fakerCore, string); // replace [4-9] with a random number in range etc...
  string = legacyReplaceSymbolWithNumber(fakerCore, string, symbol); // replace ### with random numbers

  const checkNum = luhnCheckValue(string);
  return string.replace('L', String(checkNum));
}
