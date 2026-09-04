import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { numeric } from '../string/numeric';

/**
 * Returns a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#bigint_type) number.
 * The bounds are inclusive.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Maximum value or options object.
 * @param options.min Lower bound for generated bigint. Defaults to `0n`.
 * @param options.max Upper bound for generated bigint. Defaults to `min + 999999999999999n`.
 * @param options.multipleOf The generated bigint will be a multiple of this parameter. Defaults to `1n`.
 *
 * @throws {FakerError} When `min` is greater than `max`.
 * @throws {FakerError} When there are no suitable bigint between `min` and `max`.
 * @throws {FakerError} When `multipleOf` is not a positive bigint.
 *
 * @example
 * bigInt(fakerCore) // 55422n
 * bigInt(fakerCore, 100n) // 52n
 * bigInt(fakerCore, { min: 1000000n }) // 431433n
 * bigInt(fakerCore, { max: 100n }) // 42n
 * bigInt(fakerCore, { multipleOf: 7n }) // 35n
 * bigInt(fakerCore, { min: 10n, max: 100n }) // 36n
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function bigInt(
  fakerCore: FakerCore,
  options:
    | bigint
    | number
    | string
    | boolean
    | {
        /**
         * Lower bound for generated bigint.
         *
         * @default 0n
         */
        min?: bigint | number | string | boolean;
        /**
         * Upper bound for generated bigint.
         *
         * @default min + 999999999999999n
         */
        max?: bigint | number | string | boolean;
        /**
         * The generated bigint will be a multiple of this parameter.
         *
         * @default 1n
         */
        multipleOf?: bigint | number | string | boolean;
      } = {}
): bigint {
  if (
    typeof options === 'bigint' ||
    typeof options === 'number' ||
    typeof options === 'string' ||
    typeof options === 'boolean'
  ) {
    options = {
      max: options,
    };
  }

  const min = BigInt(options.min ?? 0);
  const max = BigInt(options.max ?? min + BigInt(999999999999999));

  if (max < min) {
    throw new FakerError(`Max ${max} should be larger than min ${min}.`);
  }

  const multipleOf = BigInt(options.multipleOf ?? 1);

  if (multipleOf <= BigInt(0)) {
    throw new FakerError(`multipleOf should be greater than 0.`);
  }

  const effectiveMin = min / multipleOf + (min % multipleOf > 0n ? 1n : 0n); // Math.ceil(min / multipleOf)
  const effectiveMax = max / multipleOf - (max % multipleOf < 0n ? 1n : 0n); // Math.floor(max / multipleOf)

  if (effectiveMin === effectiveMax) {
    return effectiveMin * multipleOf;
  }

  if (effectiveMax < effectiveMin) {
    throw new FakerError(
      `No suitable bigint value between ${min} and ${max} found.`
    );
  }

  const delta = effectiveMax - effectiveMin + 1n; // +1 for inclusive max bounds and even distribution
  const offset =
    BigInt(
      numeric(fakerCore, {
        length: delta.toString(10).length,
        allowLeadingZeros: true,
      })
    ) % delta;
  return (effectiveMin + offset) * multipleOf;
}
