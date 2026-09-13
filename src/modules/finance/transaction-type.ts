import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random transaction type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * financeTransactionType(fakerCore) // 'payment'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeTransactionType(fakerCore: FakerCore): string {
  return helpersArrayElement(
    fakerCore,
    fakerCore.locale.finance.transaction_type
  );
}
