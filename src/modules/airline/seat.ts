import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeNumberInt } from '../number/int';
import type { AircraftType } from './aircraft-type';
import { Aircraft } from './aircraft-type';

const aircraftTypeMaxRows: Record<AircraftType, number> = {
  regional: 20,
  narrowbody: 35,
  widebody: 60,
};
const aircraftTypeSeats: Record<AircraftType, string[]> = {
  regional: ['A', 'B', 'C', 'D'],
  narrowbody: ['A', 'B', 'C', 'D', 'E', 'F'],
  widebody: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
};

/**
 * Generates a random seat.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options to use.
 * @param options.aircraftType The aircraft type. Can be one of `narrowbody`, `regional`, `widebody`. Defaults to `narrowbody`.
 *
 * @example
 * fakeAirlineSeat(fakerCore) // '22C'
 * fakeAirlineSeat(fakerCore, { aircraftType: 'regional' }) // '7A'
 * fakeAirlineSeat(fakerCore, { aircraftType: 'widebody' }) // '42K'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAirlineSeat(
  fakerCore: FakerCore,
  options: {
    /**
     * The aircraft type. Can be one of `narrowbody`, `regional`, `widebody`.
     *
     * @default 'narrowbody'
     */
    aircraftType?: AircraftType;
  } = {}
): string {
  const { aircraftType = Aircraft.Narrowbody } = options;
  const maxRow = aircraftTypeMaxRows[aircraftType];
  const allowedSeats = aircraftTypeSeats[aircraftType];
  const row = fakeNumberInt(fakerCore, { min: 1, max: maxRow });
  const seat = fakeHelpersArrayElement(fakerCore, allowedSeats);
  return `${row}${seat}`;
}
