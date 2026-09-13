import type { FakerCore } from '../../core';
import { financeCurrency } from './currency';

/**
 * Returns a random currency numeric code.
 * (The ISO 4217 numerical code for a currency (e.g. `US Dollar` -> `840` ))
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * financeCurrencyNumericCode(fakerCore) // '840'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeCurrencyNumericCode(fakerCore: FakerCore): string {
  return financeCurrency(fakerCore).numericCode;
}
