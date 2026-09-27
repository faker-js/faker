import type { FakerCore } from '../../core';
import { stringAlpha } from '../string/alpha';
import { stringNumeric } from '../string/numeric';

/**
 * Returns a vehicle registration number (Vehicle Registration Mark - VRM)
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * vehicleVrm(fakerCore) // 'MF56UPA'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function vehicleVrm(fakerCore: FakerCore): string {
  return `${stringAlpha(fakerCore, {
    length: 2,
    casing: 'upper',
  })}${stringNumeric(fakerCore, {
    length: 2,
    allowLeadingZeros: true,
  })}${stringAlpha(fakerCore, {
    length: 3,
    casing: 'upper',
  })}`;
}
