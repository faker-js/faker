import type { FakerCore } from '../../core';
import { fakeHelpersReplaceCreditCardSymbols } from '../helpers/replace-credit-card-symbols';

/**
 * Generates IMEI number.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakePhoneImei(fakerCore) // '13-850175-913761-7'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePhoneImei(fakerCore: FakerCore): string {
  return fakeHelpersReplaceCreditCardSymbols(
    fakerCore,
    '##-######-######-L',
    '#'
  );
}
