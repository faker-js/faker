import type { FakerCore } from '../../core';
import { fakeStringNumeric } from '../string/numeric';

/**
 * Generates a random credit card CVV.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFinanceCreditCardCVV(fakerCore) // '506'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceCreditCardCVV(fakerCore: FakerCore): string {
  return fakeStringNumeric(fakerCore, { length: 3, allowLeadingZeros: true });
}
