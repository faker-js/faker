import type { FakerCore } from '../../core';
import { financeCurrency } from './currency';

/**
 * Returns a random currency symbol.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * financeCurrencySymbol(fakerCore) // '$'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeCurrencySymbol(fakerCore: FakerCore): string {
  let symbol: string;
  do {
    symbol = financeCurrency(fakerCore).symbol;
  } while (symbol.length === 0);

  return symbol;
}
