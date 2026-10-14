import type { FakerCore } from '../../core';
import { fakeNumberInt } from '../number/int';

/**
 * Generates a random port number.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeInternetPort(fakerCore) // 9414
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeInternetPort(fakerCore: FakerCore): number {
  return fakeNumberInt(fakerCore, { min: 1, max: 65535 });
}
