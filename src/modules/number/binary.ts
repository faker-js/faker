import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { int } from './int';

/**
 * Returns a [binary](https://en.wikipedia.org/wiki/Binary_number) number.
 * The bounds are inclusive.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Maximum value or options object.
 * @param options.min Lower bound for generated number. Defaults to `0`.
 * @param options.max Upper bound for generated number. Defaults to `1`.
 *
 * @throws {FakerError} When `min` is greater than `max`.
 * @throws {FakerError} When there are no integers between `min` and `max`.
 *
 * @see stringBinary(fakerCore): For generating a `binary string` with a given length (range).
 *
 * @example
 * binary(fakerCore) // '1'
 * binary(fakerCore, 255) // '110101'
 * binary(fakerCore, { min: 0, max: 65535 }) // '10110101'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function binary(
  fakerCore: FakerCore,
  options:
    | number
    | {
        /**
         * Lower bound for generated number.
         *
         * @default 0
         */
        min?: number;
        /**
         * Upper bound for generated number.
         *
         * @default 1
         */
        max?: number;
      } = {}
): string {
  if (typeof options === 'number') {
    options = { max: options };
  }

  const { min = 0, max = 1 } = options;

  return int(fakerCore, {
    max,
    min,
  }).toString(2);
}
