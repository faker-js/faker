import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { int } from './int';

/**
 * Returns a lowercase [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) number.
 * The bounds are inclusive.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Maximum value or options object.
 * @param options.min Lower bound for generated number. Defaults to `0`.
 * @param options.max Upper bound for generated number. Defaults to `15`.
 *
 * @throws {FakerError} When `min` is greater than `max`.
 * @throws {FakerError} When there are no integers between `min` and `max`.
 *
 * @example
 * hex(fakerCore) // 'b'
 * hex(fakerCore, 255) // '9d'
 * hex(fakerCore, { min: 0, max: 65535 }) // 'af17'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function hex(
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
         * @default 15
         */
        max?: number;
      } = {}
): string {
  if (typeof options === 'number') {
    options = { max: options };
  }

  const { min = 0, max = 15 } = options;

  return int(fakerCore, {
    max,
    min,
  }).toString(16);
}
