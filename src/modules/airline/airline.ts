import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

export interface Airline {
  /**
   * The name of the airline (e.g. `'American Airlines'`).
   */
  readonly name: string;
  /**
   * The 2 character IATA code of the airline (e.g. `'AA'`).
   */
  readonly iataCode: string;
}

/**
 * Generates a random airline.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * airline(fakerCore) // { name: 'American Airlines', iataCode: 'AA' }
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function airline(fakerCore: FakerCore): Airline {
  return arrayElement(fakerCore, fakerCore.locale.airline.airline);
}
