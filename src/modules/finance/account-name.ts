import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random account name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * accountName(fakerCore) // 'Personal Loan Account'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function accountName(fakerCore: FakerCore): string {
  return [
    arrayElement(fakerCore, fakerCore.locale.finance.account_type),
    'Account',
  ].join(' ');
}
