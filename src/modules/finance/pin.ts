import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { numeric } from '../string/numeric';

/**
 * Generates a random PIN number.
 *
 * @param fakerCore The FakerCore to use.
 * @param length The length of the PIN to generate. Defaults to `4`.
 *
 * @throws {FakerError} Will throw an error if length is less than 1.
 *
 * @see stringNumeric(fakerCore): For generating the pin with greater control.
 *
 * @example
 * pin(fakerCore) // '5067'
 * pin(fakerCore, 6) // '213789'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function pin(fakerCore: FakerCore, length?: number): string;
/**
 * Generates a random PIN number.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.length The length of the PIN to generate. Defaults to `4`.
 *
 * @throws {FakerError} Will throw an error if length is less than 1.
 *
 * @see stringNumeric(fakerCore): For generating the pin with greater control.
 *
 * @example
 * pin(fakerCore) // '5067'
 * pin(fakerCore, { length: 6 }) // '213789'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function pin(
  fakerCore: FakerCore,
  options?: {
    /**
     * The length of the PIN to generate.
     *
     * @default 4
     */
    length?: number;
  }
): string;
/**
 * Generates a random PIN number.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object or the length of the PIN.
 * @param options.length The length of the PIN to generate. Defaults to `4`.
 *
 * @throws {FakerError} Will throw an error if length is less than 1.
 *
 * @see stringNumeric(fakerCore): For generating the pin with greater control.
 *
 * @example
 * pin(fakerCore) // '5067'
 * pin(fakerCore, { length: 6 }) // '213789'
 * pin(fakerCore, 6) // '213789'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function pin(
  fakerCore: FakerCore,
  options?:
    | number
    | {
        /**
         * The length of the PIN to generate.
         *
         * @default 4
         */
        length?: number;
      }
): string;
/**
 * Generates a random PIN number.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object or the length of the PIN.
 * @param options.length The length of the PIN to generate. Defaults to `4`.
 *
 * @throws {FakerError} Will throw an error if length is less than 1.
 *
 * @see stringNumeric(fakerCore): For generating the pin with greater control.
 *
 * @example
 * pin(fakerCore) // '5067'
 * pin(fakerCore, { length: 6 }) // '213789'
 * pin(fakerCore, 6) // '213789'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function pin(
  fakerCore: FakerCore,
  options:
    | number
    | {
        /**
         * The length of the PIN to generate.
         *
         * @default 4
         */
        length?: number;
      } = {}
): string {
  if (typeof options === 'number') {
    options = { length: options };
  }

  const { length = 4 } = options;

  if (length < 1) {
    throw new FakerError('minimum length is 1');
  }

  return numeric(fakerCore, { length, allowLeadingZeros: true });
}
