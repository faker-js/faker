import type { FakerCore } from '../../core';
import { manufacturer } from './manufacturer';
import { model } from './model';

/**
 * Returns a random vehicle.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * vehicle(fakerCore) // 'BMW Explorer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function vehicle(fakerCore: FakerCore): string {
  return `${manufacturer(fakerCore)} ${model(fakerCore)}`;
}
