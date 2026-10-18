import type { FakerCore } from '../../core';
import { fakeStringNumeric } from '../string/numeric';

/**
 * Generates a random account number.
 *
 * @param fakerCore The FakerCore to use.
 * @param length The length of the account number. Defaults to `8`.
 *
 * @see fakeStringNumeric(fakerCore): For generating the number with greater control.
 *
 * @example
 * fakeFinanceAccountNumber(fakerCore) // '92842238'
 * fakeFinanceAccountNumber(fakerCore, 5) // '32564'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceAccountNumber(
  fakerCore: FakerCore,
  length?: number
): string;
/**
 * Generates a random account number.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.length The length of the account number. Defaults to `8`.
 *
 * @see fakeStringNumeric(fakerCore): For generating the number with greater control.
 *
 * @example
 * fakeFinanceAccountNumber(fakerCore) // '92842238'
 * fakeFinanceAccountNumber(fakerCore, { length: 5 }) // '32564'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceAccountNumber(
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
 * @see fakeStringNumeric(fakerCore): For generating the number with greater control.
 *
 * @example
 * fakeFinanceAccountNumber(fakerCore) // '92842238'
 * fakeFinanceAccountNumber(fakerCore, 5) // '28736'
 * fakeFinanceAccountNumber(fakerCore, { length: 5 }) // '32564'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceAccountNumber(
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
 * @see fakeStringNumeric(fakerCore): For generating the number with greater control.
 *
 * @example
 * fakeFinanceAccountNumber(fakerCore) // '92842238'
 * fakeFinanceAccountNumber(fakerCore, 5) // '28736'
 * fakeFinanceAccountNumber(fakerCore, { length: 5 }) // '32564'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceAccountNumber(
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

  return fakeStringNumeric(fakerCore, { length, allowLeadingZeros: true });
}
