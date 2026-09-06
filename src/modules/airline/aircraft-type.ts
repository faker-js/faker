import type { FakerCore } from '../../core';
import { enumValue } from '../helpers/enum-value';

/**
 * Returns a random aircraft type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * aircraftType(fakerCore) // 'narrowbody'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function aircraftType(fakerCore: FakerCore): AircraftType {
  return enumValue(fakerCore, Aircraft);
}
