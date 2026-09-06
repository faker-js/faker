import type { FakerCore } from '../../core';
import { currency } from './currency';

/**
 * Returns a random currency code.
 * (The short text/abbreviation for the currency (e.g. `US Dollar` -> `USD`))
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * currencyCode(fakerCore) // 'USD'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function currencyCode(fakerCore: FakerCore): string {
  return currency(fakerCore).code;
}
