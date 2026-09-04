import type { FakerCore } from '../../core';
import type { Distributor } from '../../distributors/distributor';
import { uniformDistributor } from '../../distributors/uniform';
import { FakerError } from '../../errors/faker-error';

/**
 * Returns a single random integer between zero and the given max value or the given range.
 * The bounds are inclusive.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Maximum value or options object.
 * @param options.min Lower bound for generated number. Defaults to `0`.
 * @param options.max Upper bound for generated number. Defaults to `Number.MAX_SAFE_INTEGER`.
 * @param options.multipleOf Generated number will be a multiple of the given integer. Defaults to `1`.
 * @param options.distributor A function to determine the distribution of generated values. Defaults to `uniformDistributor()`.
 *
 * @throws {FakerError} When `min` is greater than `max`.
 * @throws {FakerError} When there are no suitable integers between `min` and `max`.
 * @throws {FakerError} When `multipleOf` is not a positive integer.
 *
 * @see stringNumeric(fakerCore): For generating a `string` of digits with a given length (range).
 *
 * @example
 * int(fakerCore) // 2900970162509863
 * int(fakerCore, 100) // 52
 * int(fakerCore, { min: 1000000 }) // 2900970162509863
 * int(fakerCore, { max: 100 }) // 42
 * int(fakerCore, { min: 10, max: 100 }) // 57
 * int(fakerCore, { min: 10, max: 100, multipleOf: 10 }) // 50
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function int(
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
         * @default Number.MAX_SAFE_INTEGER
         */
        max?: number;
        /**
         * Generated number will be a multiple of the given integer.
         *
         * @default 1
         */
        multipleOf?: number;
        /**
         * A function to determine the distribution of generated values.
         *
         * @default uniformDistributor()
         */
        distributor?: Distributor;
      } = {}
): number {
  if (typeof options === 'number') {
    options = { max: options };
  }

  const {
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    multipleOf = 1,
    distributor = uniformDistributor(),
  } = options;

  if (!Number.isSafeInteger(multipleOf)) {
    throw new FakerError(`multipleOf should be an integer.`);
  }

  if (multipleOf <= 0) {
    throw new FakerError(`multipleOf should be greater than 0.`);
  }

  const effectiveMin = Math.ceil(min / multipleOf);
  const effectiveMax = Math.floor(max / multipleOf);

  if (effectiveMin === effectiveMax) {
    return effectiveMin * multipleOf;
  }

  if (effectiveMax < effectiveMin) {
    if (max >= min) {
      throw new FakerError(
        `No suitable integer value between ${min} and ${max} found.`
      );
    }

    throw new FakerError(`Max ${max} should be greater than min ${min}.`);
  }

  const real = distributor(fakerCore.randomizer);
  const delta = effectiveMax - effectiveMin + 1; // +1 for inclusive max bounds and even distribution
  return Math.floor(real * delta + effectiveMin) * multipleOf;
}
