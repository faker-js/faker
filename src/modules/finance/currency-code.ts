import type { FakerCore } from '../../core';
import { fakeFinanceCurrency } from './currency';

/**
 * Returns a random currency code.
 * (The short text/abbreviation for the currency (e.g. `US Dollar` -> `USD`))
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFinanceCurrencyCode(fakerCore) // 'USD'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceCurrencyCode(fakerCore: FakerCore): string {
  return fakeFinanceCurrency(fakerCore).code;
}
