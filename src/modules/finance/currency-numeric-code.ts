import type { FakerCore } from '../../core';
import { currency } from './currency';

/**
 * Returns a random currency numeric code.
 * (The ISO 4217 numerical code for a currency (e.g. `US Dollar` -> `840` ))
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * currencyNumericCode(fakerCore) // '840'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function currencyNumericCode(fakerCore: FakerCore): string {
  return currency(fakerCore).numericCode;
}
