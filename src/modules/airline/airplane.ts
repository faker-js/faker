import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

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
 * airlineAirplane(fakerCore) // { name: 'Airbus A321neo', iataTypeCode: '32Q' }
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function airlineAirplane(fakerCore: FakerCore): Airplane {
  return helpersArrayElement(fakerCore, fakerCore.locale.airline.airplane);
}
