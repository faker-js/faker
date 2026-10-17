import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

export interface Airplane {
  /**
   * The name of the airplane (e.g. `'Airbus A321'`).
   */
  readonly name: string;
  /**
   * The IATA code of the airplane (e.g. `'321'`).
   */
  readonly iataTypeCode: string;
}

/**
 * Generates a random airplane.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAirlineAirplane(fakerCore) // { name: 'Airbus A321neo', iataTypeCode: '32Q' }
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAirlineAirplane(fakerCore: FakerCore): Airplane {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.airline.airplane);
}
