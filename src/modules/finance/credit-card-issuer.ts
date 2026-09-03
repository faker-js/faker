import type { FakerCore } from '../../core';
import { objectKey } from '../helpers/object-key';

/**
 * Returns a random credit card issuer.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * creditCardIssuer(fakerCore) // 'discover'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function creditCardIssuer(fakerCore: FakerCore): string {
  return objectKey(fakerCore, fakerCore.locale.finance.credit_card) as string;
}
