import type { FakerCore } from '../../core';
import { weightedArrayElement } from '../helpers/weighted-array-element';
import { float } from '../number/float';
import { int } from '../number/int';

/**
 * Generates a price between min and max (inclusive).
 *
 * To better represent real-world prices, when `options.dec` is greater than `0`, the final decimal digit in the returned string will be generated as follows:
 *
 * - 50% of the time: `9`
 * - 30% of the time: `5`
 * - 10% of the time: `0`
 * - 10% of the time: a random digit from `0` to `9`
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.min The minimum price. Defaults to `1`.
 * @param options.max The maximum price. Defaults to `1000`.
 * @param options.dec The number of decimal places. Defaults to `2`.
 * @param options.symbol The currency value to use. Defaults to `''`.
 *
 * @example
 * price(fakerCore) // '828.07'
 * price(fakerCore, { min: 100 }) // '904.19'
 * price(fakerCore, { min: 100, max: 200 }) // '154.55'
 * price(fakerCore, { min: 100, max: 200, dec: 0 }) // '133'
 * price(fakerCore, { min: 100, max: 200, dec: 0, symbol: '$' }) // '$114'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function price(
  fakerCore: FakerCore,
  options: {
    /**
     * The minimum price.
     *
     * @default 1
     */
    min?: number;
    /**
     * The maximum price.
     *
     * @default 1000
     */
    max?: number;
    /**
     * The number of decimal places.
     *
     * @default 2
     */
    dec?: number;
    /**
     * The currency value to use.
     *
     * @default ''
     */
    symbol?: string;
  } = {}
): string {
  const { dec = 2, max = 1000, min = 1, symbol = '' } = options;

  if (min < 0 || max < 0) {
    return `${symbol}0`;
  }

  if (min === max) {
    return `${symbol}${min.toFixed(dec)}`;
  }

  const generated = float(fakerCore, {
    min,
    max,
    fractionDigits: dec,
  });

  if (dec === 0) {
    return `${symbol}${generated.toFixed(dec)}`;
  }

  const oldLastDigit = (generated * 10 ** dec) % 10;
  const newLastDigit = weightedArrayElement(fakerCore, [
    { weight: 5, value: 9 },
    { weight: 3, value: 5 },
    { weight: 1, value: 0 },
    {
      weight: 1,
      value: int(fakerCore, { min: 0, max: 9 }),
    },
  ]);

  const fraction = (1 / 10) ** dec;
  const oldLastDigitValue = oldLastDigit * fraction;
  const newLastDigitValue = newLastDigit * fraction;
  const combined = generated - oldLastDigitValue + newLastDigitValue;

  if (min <= combined && combined <= max) {
    return `${symbol}${combined.toFixed(dec)}`;
  }

  return `${symbol}${generated.toFixed(dec)}`;
}
