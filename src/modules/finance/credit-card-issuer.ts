import type { FakerCore } from '../../core';
import { helpersObjectKey } from '../helpers/object-key';

/**
 * Returns a random credit card issuer.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * financeCreditCardIssuer(fakerCore) // 'discover'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeCreditCardIssuer(fakerCore: FakerCore): string {
  return helpersObjectKey(fakerCore, fakerCore.locale.finance.credit_card) as string;
}
