import type { FakerCore } from '../../core';
import { alpha } from '../string/alpha';
import { numeric } from '../string/numeric';

/**
 * Returns a vehicle registration number (Vehicle Registration Mark - VRM)
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * vrm(fakerCore) // 'MF56UPA'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function vrm(fakerCore: FakerCore): string {
  return `${alpha(fakerCore, {
    length: 2,
    casing: 'upper',
  })}${numeric(fakerCore, {
    length: 2,
    allowLeadingZeros: true,
  })}${alpha(fakerCore, {
    length: 3,
    casing: 'upper',
  })}`;
}
