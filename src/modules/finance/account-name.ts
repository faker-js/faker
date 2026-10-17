import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random account name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFinanceAccountName(fakerCore) // 'Personal Loan Account'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceAccountName(fakerCore: FakerCore): string {
  return [
    fakeHelpersArrayElement(fakerCore, fakerCore.locale.finance.account_type),
    'Account',
  ].join(' ');
}
