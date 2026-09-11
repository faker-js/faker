import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { numeric } from '../string/numeric';

/**
 * Returns a random flight number. Flight numbers are always 1 to 4 digits long. Sometimes they are
 * used without leading zeros (e.g.: `American Airlines flight 425`) and sometimes with leading
 * zeros, often with the airline code prepended (e.g.: `AA0425`).
 *
 * To generate a flight number prepended with an airline code, combine this function with the
 * `airline()` function and use template literals:
 * ```
 * `${airline(fakerCore).iataCode}${flightNumber(fakerCore, { addLeadingZeros: true })}` // 'AA0798'
 * ```
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options to use.
 * @param options.length The number or range of digits to generate. Defaults to `{ min: 1, max: 4 }`.
 * @param options.addLeadingZeros Whether to pad the flight number up to 4 digits with leading zeros. Defaults to `false`.
 *
 * @example
 * flightNumber(fakerCore) // '2405'
 * flightNumber(fakerCore, { addLeadingZeros: true }) // '0249'
 * flightNumber(fakerCore, { addLeadingZeros: true, length: 2 }) // '0042'
 * flightNumber(fakerCore, { addLeadingZeros: true, length: { min: 2, max: 3 } }) // '0624'
 * flightNumber(fakerCore, { length: 3 }) // '425'
 * flightNumber(fakerCore, { length: { min: 2, max: 3 } }) // '84'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function flightNumber(
  fakerCore: FakerCore,
  options: {
    /**
     * The number or range of digits to generate.
     *
     * @default { min: 1, max: 4 }
     */
    length?: NumberOrRange;
    /**
     * Whether to pad the flight number up to 4 digits with leading zeros.
     *
     * @default false
     */
    addLeadingZeros?: boolean;
  } = {}
): string {
  const { length = { min: 1, max: 4 }, addLeadingZeros = false } = options;
  const flightNumber = numeric(fakerCore, {
    length,
    allowLeadingZeros: false,
  });
  return addLeadingZeros ? flightNumber.padStart(4, '0') : flightNumber;
}
