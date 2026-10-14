import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * The possible definitions related to currency entries.
 */
export interface Currency {
  /**
   * The full name for the currency (e.g. `US Dollar`).
   */
  name: string;

  /**
   * The code/short text/abbreviation for the currency (e.g. `USD`).
   */
  code: string;

  /**
   * The symbol for the currency (e.g. `$`).
   */
  symbol: string;

  /**
   * The ISO 4217 numeric code for the currency (e.g. `840`).
   */
  numericCode: string;
}

/**
 * Returns a random currency object, containing `code`, `name`, `symbol`, and `numericCode` properties.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @see fakeFinanceCurrencyCode(fakerCore): For generating specifically the currency code.
 * @see fakeFinanceCurrencyName(fakerCore): For generating specifically the currency name.
 * @see fakeFinanceCurrencySymbol(fakerCore): For generating specifically the currency symbol.
 * @see fakeFinanceCurrencyNumericCode(fakerCore): For generating specifically the currency numeric code.
 *
 * @example
 * fakeFinanceCurrency(fakerCore) // { code: 'USD', name: 'US Dollar', symbol: '$', numericCode: '840' }
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceCurrency(fakerCore: FakerCore): Currency {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.finance.currency);
}
