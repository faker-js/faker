import type { FakerCore } from '../../core';
import { replaceCreditCardSymbols } from '../helpers/replace-credit-card-symbols';

/**
 * Generates IMEI number.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * imei(fakerCore) // '13-850175-913761-7'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function imei(fakerCore: FakerCore): string {
  return replaceCreditCardSymbols(fakerCore, '##-######-######-L', '#');
}
