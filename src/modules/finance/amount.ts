import type { FakerCore } from '../../core';
import { float } from '../number/float';

/**
 * Generates a random amount between the given bounds (inclusive).
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.min The lower bound for the amount. Defaults to `0`.
 * @param options.max The upper bound for the amount. Defaults to `1000`.
 * @param options.dec The number of decimal places for the amount. Defaults to `2`.
 * @param options.symbol The symbol used to prefix the amount. Defaults to `''`.
 * @param options.autoFormat If true this method will use `Number.toLocaleString()`. Otherwise it will use `Number.toFixed()`.
 *
 * @see numberFloat(fakerCore): For generating the amount with greater control.
 *
 * @example
 * amount(fakerCore) // '617.87'
 * amount(fakerCore, { min: 5, max: 10 }) // '5.53'
 * amount(fakerCore, { min: 5, max: 10, dec: 0 }) // '8'
 * amount(fakerCore, { min: 5, max: 10, dec: 2, symbol: '$' }) // '$5.85'
 * amount(fakerCore, { min: 5, max: 10, dec: 5, symbol: '', autoFormat: true }) // '9,75067'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function amount(
  fakerCore: FakerCore,
  options: {
    /**
     * The lower bound for the amount.
     *
     * @default 0
     */
    min?: number;
    /**
     * The upper bound for the amount.
     *
     * @default 1000
     */
    max?: number;
    /**
     * The number of decimal places for the amount.
     *
     * @default 2
     */
    dec?: number;
    /**
     * The symbol used to prefix the amount.
     *
     * @default ''
     */
    symbol?: string;
    /**
     * If true this method will use `Number.toLocaleString()`. Otherwise it will use `Number.toFixed()`.
     *
     * @default false
     */
    autoFormat?: boolean;
  } = {}
): string {
  const {
    autoFormat = false,
    dec = 2,
    max = 1000,
    min = 0,
    symbol = '',
  } = options;

  const randValue = float(fakerCore, {
    max,
    min,
    fractionDigits: dec,
  });

  const formattedString = autoFormat
    ? randValue.toLocaleString(undefined, { minimumFractionDigits: dec })
    : randValue.toFixed(dec);

  return symbol + formattedString;
}
