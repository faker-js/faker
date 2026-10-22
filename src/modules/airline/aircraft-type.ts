import type { FakerCore } from '../../core';
import { fakeHelpersEnumValue } from '../helpers/enum-value';

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
 * fakeAirlineAircraftType(fakerCore) // 'narrowbody'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAirlineAircraftType(fakerCore: FakerCore): AircraftType {
  return fakeHelpersEnumValue(fakerCore, Aircraft);
}
