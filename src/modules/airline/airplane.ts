import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random airplane.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * airplane(fakerCore) // { name: 'Airbus A321neo', iataTypeCode: '32Q' }
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function airplane(fakerCore: FakerCore): Airplane {
  return arrayElement(fakerCore, fakerCore.locale.airline.airplane);
}
