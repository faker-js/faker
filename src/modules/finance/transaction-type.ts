import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random transaction type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFinanceTransactionType(fakerCore) // 'payment'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceTransactionType(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.finance.transaction_type
  );
}
