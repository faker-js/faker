import type { FakerCore } from '../../core';
import { numeric } from '../string/numeric';

/**
 * Generates a random account number.
 *
 * @param fakerCore The FakerCore to use.
 * @param length The length of the account number. Defaults to `8`.
 *
 * @see stringNumeric(fakerCore): For generating the number with greater control.
 *
 * @example
 * accountNumber(fakerCore) // '92842238'
 * accountNumber(fakerCore, 5) // '32564'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function accountNumber(fakerCore: FakerCore, length?: number): string;
/**
 * Generates a random account number.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.length The length of the account number. Defaults to `8`.
 *
 * @see stringNumeric(fakerCore): For generating the number with greater control.
 *
 * @example
 * accountNumber(fakerCore) // '92842238'
 * accountNumber(fakerCore, { length: 5 }) // '32564'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function accountNumber(
  fakerCore: FakerCore,
  options?: {
    /**
     * The length of the account number.
     *
     * @default 8
     */
    length?: number;
  }
): string;
/**
 * Generates a random account number.
 *
 * @param fakerCore The FakerCore to use.
 * @param optionsOrLength An options object or the length of the account number.
 * @param optionsOrLength.length The length of the account number. Defaults to `8`.
 *
 * @see stringNumeric(fakerCore): For generating the number with greater control.
 *
 * @example
 * accountNumber(fakerCore) // '92842238'
 * accountNumber(fakerCore, 5) // '28736'
 * accountNumber(fakerCore, { length: 5 }) // '32564'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function accountNumber(
  fakerCore: FakerCore,
  optionsOrLength?:
    | number
    | {
        /**
         * The length of the account number.
         *
         * @default 8
         */
        length?: number;
      }
): string;
/**
 * Generates a random account number.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object or the length of the account number.
 * @param options.length The length of the account number. Defaults to `8`.
 *
 * @see stringNumeric(fakerCore): For generating the number with greater control.
 *
 * @example
 * accountNumber(fakerCore) // '92842238'
 * accountNumber(fakerCore, 5) // '28736'
 * accountNumber(fakerCore, { length: 5 }) // '32564'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function accountNumber(
  fakerCore: FakerCore,
  options:
    | number
    | {
        /**
         * The length of the account number.
         *
         * @default 8
         */
        length?: number;
      } = {}
): string {
  if (typeof options === 'number') {
    options = { length: options };
  }

  const { length = 8 } = options;

  return numeric(fakerCore, { length, allowLeadingZeros: true });
}
