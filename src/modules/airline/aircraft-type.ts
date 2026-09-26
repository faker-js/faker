import type { FakerCore } from '../../core';
import { helpersEnumValue } from '../helpers/enum-value';

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
 * airlineAircraftType(fakerCore) // 'narrowbody'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function airlineAircraftType(fakerCore: FakerCore): AircraftType {
  return helpersEnumValue(fakerCore, Aircraft);
}
