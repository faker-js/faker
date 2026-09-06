import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { int } from '../number/int';

/**
 * Generates a random seat.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options to use.
 * @param options.aircraftType The aircraft type. Can be one of `narrowbody`, `regional`, `widebody`. Defaults to `narrowbody`.
 *
 * @example
 * seat(fakerCore) // '22C'
 * seat(fakerCore, { aircraftType: 'regional' }) // '7A'
 * seat(fakerCore, { aircraftType: 'widebody' }) // '42K'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function seat(
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
  const row = int(fakerCore, { min: 1, max: maxRow });
  const seat = arrayElement(fakerCore, allowedSeats);
  return `${row}${seat}`;
}
