import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

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
