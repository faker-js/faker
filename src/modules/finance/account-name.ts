import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random account name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * financeAccountName(fakerCore) // 'Personal Loan Account'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeAccountName(fakerCore: FakerCore): string {
  return [
    helpersArrayElement(fakerCore, fakerCore.locale.finance.account_type),
    'Account',
  ].join(' ');
}
