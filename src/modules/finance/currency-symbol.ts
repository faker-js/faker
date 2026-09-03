import type { FakerCore } from '../../core';
import { currency } from './currency';

/**
 * Returns a random currency symbol.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * currencySymbol(fakerCore) // '$'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function currencySymbol(fakerCore: FakerCore): string {
  let symbol: string;
  do {
    symbol = currency(fakerCore).symbol;
  } while (symbol.length === 0);

  return symbol;
}
