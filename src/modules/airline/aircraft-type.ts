import type { FakerCore } from '../../core';
import { enumValue } from '../helpers/enum-value';

export enum Aircraft {
  Narrowbody = 'narrowbody',
  Regional = 'regional',
  Widebody = 'widebody',
}

export type AircraftType = `${Aircraft}`;

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
