import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { int } from './int';

/**
 * Returns a roman numeral in String format.
 * The bounds are inclusive.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Maximum value or options object.
 * @param options.min Lower bound for generated roman numerals. Defaults to `1`.
 * @param options.max Upper bound for generated roman numerals. Defaults to `3999`.
 *
 * @throws {FakerError} When `min` is greater than `max`.
 * @throws {FakerError} When `min`, `max` is not a number.
 * @throws {FakerError} When `min` is less than `1`.
 * @throws {FakerError} When `max` is greater than `3999`.
 *
 * @example
 * romanNumeral(fakerCore) // "CMXCIII"
 * romanNumeral(fakerCore, 5) // "III"
 * romanNumeral(fakerCore, { min: 10 }) // "XCIX"
 * romanNumeral(fakerCore, { max: 20 }) // "XVII"
 * romanNumeral(fakerCore, { min: 5, max: 10 }) // "VII"
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function romanNumeral(
  fakerCore: FakerCore,
  options:
    | number
    | {
        /**
         * Lower bound for generated number.
         *
         * @default 1
         */
        min?: number;
        /**
         * Upper bound for generated number.
         *
         * @default 3999
         */
        max?: number;
      } = {}
): string {
  const DEFAULT_MIN = 1;
  const DEFAULT_MAX = 3999;

  if (typeof options === 'number') {
    options = {
      max: options,
    };
  }

  const { min = DEFAULT_MIN, max = DEFAULT_MAX } = options;

  if (min < DEFAULT_MIN) {
    throw new FakerError(
      `Min value ${min} should be ${DEFAULT_MIN} or greater.`
    );
  }

  if (max > DEFAULT_MAX) {
    throw new FakerError(`Max value ${max} should be ${DEFAULT_MAX} or less.`);
  }

  let num = int(fakerCore, { min, max });

  const lookup: Array<[string, number]> = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1],
  ];

  let result = '';

  for (const [k, v] of lookup) {
    result += k.repeat(Math.floor(num / v));
    num %= v;
  }

  return result;
}
