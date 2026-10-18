import type { FakerCore } from '../../core';
import { fakeHelpersObjectKey } from '../helpers/object-key';

/**
 * Returns a random credit card issuer.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFinanceCreditCardIssuer(fakerCore) // 'discover'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceCreditCardIssuer(fakerCore: FakerCore): string {
  return fakeHelpersObjectKey(
    fakerCore,
    fakerCore.locale.finance.credit_card
  ) as string;
}
