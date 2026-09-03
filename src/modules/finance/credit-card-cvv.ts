import type { FakerCore } from '../../core';
import { numeric } from '../string/numeric';

/**
 * Generates a random credit card CVV.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * creditCardCVV(fakerCore) // '506'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function creditCardCVV(fakerCore: FakerCore): string {
  return numeric(fakerCore, { length: 3, allowLeadingZeros: true });
}
