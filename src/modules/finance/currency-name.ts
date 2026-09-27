import type { FakerCore } from '../../core';
import { financeCurrency } from './currency';

/**
 * Returns a random currency name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * financeCurrencyName(fakerCore) // 'US Dollar'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeCurrencyName(fakerCore: FakerCore): string {
  return financeCurrency(fakerCore).name;
}
