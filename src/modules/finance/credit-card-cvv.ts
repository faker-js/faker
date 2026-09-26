import type { FakerCore } from '../../core';
import { stringNumeric } from '../string/numeric';

/**
 * Generates a random credit card CVV.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * financeCreditCardCVV(fakerCore) // '506'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeCreditCardCVV(fakerCore: FakerCore): string {
  return stringNumeric(fakerCore, { length: 3, allowLeadingZeros: true });
}
