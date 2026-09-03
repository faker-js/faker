import type { FakerCore } from '../../core';
import { int } from '../number/int';

/**
 * Returns a [semantic version](https://semver.org).
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * semver(fakerCore) // '1.15.2'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function semver(fakerCore: FakerCore): string {
  return [int(fakerCore, 9), int(fakerCore, 20), int(fakerCore, 20)].join('.');
}
