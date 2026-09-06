import type { FakerCore } from '../../core';
import { currency } from './currency';

/**
 * Returns a random currency name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * currencyName(fakerCore) // 'US Dollar'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function currencyName(fakerCore: FakerCore): string {
  return currency(fakerCore).name;
}
