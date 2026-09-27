import type { FakerCore } from '../../core';
import { financeCurrency } from './currency';

/**
 * Returns a random currency code.
 * (The short text/abbreviation for the currency (e.g. `US Dollar` -> `USD`))
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * financeCurrencyCode(fakerCore) // 'USD'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeCurrencyCode(fakerCore: FakerCore): string {
  return financeCurrency(fakerCore).code;
}
