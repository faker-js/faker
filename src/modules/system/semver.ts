import type { FakerCore } from '../../core';
import { numberInt } from '../number/int';

/**
 * Returns a [semantic version](https://semver.org).
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * systemSemver(fakerCore) // '1.15.2'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function systemSemver(fakerCore: FakerCore): string {
  return [numberInt(fakerCore, 9), numberInt(fakerCore, 20), numberInt(fakerCore, 20)].join('.');
}
