import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random currency symbol.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @throws {FakerError} If no currency in the locale data has a symbol.
 *
 * @example
 * currencySymbol(fakerCore) // '$'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function currencySymbol(fakerCore: FakerCore): string {
  const currenciesWithSymbols = fakerCore.locale.finance.currency.filter(
    (currency) => currency.symbol.length > 0
  );

  if (currenciesWithSymbols.length === 0) {
    throw new FakerError(
      'Cannot get currency symbol from dataset with no currency symbols.'
    );
  }

  return arrayElement(fakerCore, currenciesWithSymbols).symbol;
}
