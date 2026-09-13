import type { FakerCore } from '../../core';
import { helpersReplaceCreditCardSymbols } from '../helpers/replace-credit-card-symbols';

/**
 * Generates IMEI number.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * phoneImei(fakerCore) // '13-850175-913761-7'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function phoneImei(fakerCore: FakerCore): string {
  return helpersReplaceCreditCardSymbols(fakerCore, '##-######-######-L', '#');
}
