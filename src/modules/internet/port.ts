import type { FakerCore } from '../../core';
import { numberInt } from '../number/int';

/**
 * Generates a random port number.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * internetPort(fakerCore) // 9414
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function internetPort(fakerCore: FakerCore): number {
  return numberInt(fakerCore, { min: 1, max: 65535 });
}
