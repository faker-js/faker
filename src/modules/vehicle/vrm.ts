import type { FakerCore } from '../../core';
import { fakeStringAlpha } from '../string/alpha';
import { fakeStringNumeric } from '../string/numeric';

/**
 * Returns a vehicle registration number (Vehicle Registration Mark - VRM)
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeVehicleVrm(fakerCore) // 'MF56UPA'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeVehicleVrm(fakerCore: FakerCore): string {
  return `${fakeStringAlpha(fakerCore, {
    length: 2,
    casing: 'upper',
  })}${fakeStringNumeric(fakerCore, {
    length: 2,
    allowLeadingZeros: true,
  })}${fakeStringAlpha(fakerCore, {
    length: 3,
    casing: 'upper',
  })}`;
}
