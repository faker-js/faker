import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { int } from './int';

/**
 * Returns an [octal](https://en.wikipedia.org/wiki/Octal) number.
 * The bounds are inclusive.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Maximum value or options object.
 * @param options.min Lower bound for generated number. Defaults to `0`.
 * @param options.max Upper bound for generated number. Defaults to `7`.
 *
 * @throws {FakerError} When `min` is greater than `max`.
 * @throws {FakerError} When there are no integers between `min` and `max`.
 *
 * @see stringOctal(fakerCore): For generating an `octal string` with a given length (range).
 *
 * @example
 * octal(fakerCore) // '5'
 * octal(fakerCore, 255) // '377'
 * octal(fakerCore, { min: 0, max: 65535 }) // '4766'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function octal(
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
         * @default 7
         */
        max?: number;
      } = {}
): string {
  if (typeof options === 'number') {
    options = { max: options };
  }

  const { min = 0, max = 7 } = options;

  return int(fakerCore, {
    max,
    min,
  }).toString(8);
}
