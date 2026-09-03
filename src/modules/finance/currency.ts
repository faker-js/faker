import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

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
 * @see currencyCode(fakerCore): For generating specifically the currency code.
 * @see currencyName(fakerCore): For generating specifically the currency name.
 * @see currencySymbol(fakerCore): For generating specifically the currency symbol.
 * @see currencyNumericCode(fakerCore): For generating specifically the currency numeric code.
 *
 * @example
 * currency(fakerCore) // { code: 'USD', name: 'US Dollar', symbol: '$', numericCode: '840' }
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function currency(fakerCore: FakerCore): Currency {
  return arrayElement(fakerCore, fakerCore.locale.finance.currency);
}
