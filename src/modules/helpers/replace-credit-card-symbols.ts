import type { FakerCore } from '../../core';
import { luhnCheckValue } from './_luhn-check';

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
