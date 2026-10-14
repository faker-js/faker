import type { FakerCore } from '../../core';
import { fakeFinanceCurrency } from './currency';

/**
 * Returns a random currency name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFinanceCurrencyName(fakerCore) // 'US Dollar'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceCurrencyName(fakerCore: FakerCore): string {
  return fakeFinanceCurrency(fakerCore).name;
}
