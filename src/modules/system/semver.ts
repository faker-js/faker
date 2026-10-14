import type { FakerCore } from '../../core';
import { fakeNumberInt } from '../number/int';

/**
 * Returns a [semantic version](https://semver.org).
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeSystemSemver(fakerCore) // '1.15.2'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeSystemSemver(fakerCore: FakerCore): string {
  return [
    fakeNumberInt(fakerCore, 9),
    fakeNumberInt(fakerCore, 20),
    fakeNumberInt(fakerCore, 20),
  ].join('.');
}
