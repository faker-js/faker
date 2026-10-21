import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

export interface Airport {
  /**
   * The name of the airport (e.g. `'Dallas Fort Worth International Airport'`).
   */
  readonly name: string;
  /**
   * The IATA code of the airport (e.g. `'DFW'`).
   */
  readonly iataCode: string;
}

/**
 * Generates a random airport.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAirlineAirport(fakerCore) // { name: 'Dallas Fort Worth International Airport', iataCode: 'DFW' }
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAirlineAirport(fakerCore: FakerCore): Airport {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.airline.airport);
}
