import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';
import { numberInt } from '../number/int';
import type { AircraftType } from './aircraft-type';
import { airlineAircraft } from './aircraft-type';

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
 * airlineSeat(fakerCore) // '22C'
 * airlineSeat(fakerCore, { aircraftType: 'regional' }) // '7A'
 * airlineSeat(fakerCore, { aircraftType: 'widebody' }) // '42K'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function airlineSeat(
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
  const row = numberInt(fakerCore, { min: 1, max: maxRow });
  const seat = helpersArrayElement(fakerCore, allowedSeats);
  return `${row}${seat}`;
}
