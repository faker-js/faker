import type { FakerCore } from '../../core';
import type { Distributor } from '../../distributors/distributor';
import { uniformDistributor } from '../../distributors/uniform';
import { FakerError } from '../../errors/faker-error';
import { fakeNumberInt } from './int';

/**
 * Returns a single random floating-point number, by default between `0.0` and `1.0`. To change the range, pass a `min` and `max` value. To limit the number of decimal places, pass a `multipleOf` or `fractionDigits` parameter.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Upper bound or options object.
 * @param options.min Lower bound for generated number, inclusive. Defaults to `0.0`.
 * @param options.max Upper bound for generated number, exclusive, unless `multipleOf` or `fractionDigits` are passed. Defaults to `1.0`.
 * @param options.multipleOf The generated number will be a multiple of this parameter. Only one of `multipleOf` or `fractionDigits` should be passed.
 * @param options.fractionDigits The maximum number of digits to appear after the decimal point, for example `2` will round to 2 decimal points. Only one of `multipleOf` or `fractionDigits` should be passed.
 * @param options.distributor A function to determine the distribution of generated values. Defaults to `uniformDistributor()`.
 *
 * @throws {FakerError} When `min` is greater than `max`.
 * @throws {FakerError} When `multipleOf` is not a positive number.
 * @throws {FakerError} When `fractionDigits` is negative.
 * @throws {FakerError} When `fractionDigits` and `multipleOf` is passed in the same options object.
 *
 * @example
 * fakeNumberFloat(fakerCore) // 0.5688541042618454
 * fakeNumberFloat(fakerCore, 3) // 2.367973240558058
 * fakeNumberFloat(fakerCore, { max: 100 }) // 17.3687307164073
 * fakeNumberFloat(fakerCore, { min: 20, max: 30 }) // 23.94764115102589
 * fakeNumberFloat(fakerCore, { multipleOf: 0.25, min: 0, max:10 }) // 7.75
 * fakeNumberFloat(fakerCore, { fractionDigits: 1 }) // 0.9
 * fakeNumberFloat(fakerCore, { min: 10, max: 100, multipleOf: 0.02 }) // 35.42
 * fakeNumberFloat(fakerCore, { min: 10, max: 100, fractionDigits: 3 }) // 65.716
 * fakeNumberFloat(fakerCore, { min: 10, max: 100, multipleOf: 0.001 }) // 65.716 - same as above
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeNumberFloat(
  fakerCore: FakerCore,
  options:
    | number
    | {
        /**
         * Lower bound for generated number, inclusive.
         *
         * @default 0.0
         */
        min?: number;
        /**
         * Upper bound for generated number, exclusive, unless `multipleOf` or `fractionDigits` are passed.
         *
         * @default 1.0
         */
        max?: number;
        /**
         * The maximum number of digits to appear after the decimal point, for example `2` will round to 2 decimal points. Only one of `multipleOf` or `fractionDigits` should be passed.
         */
        fractionDigits?: number;
        /**
         * The generated number will be a multiple of this parameter. Only one of `multipleOf` or `fractionDigits` should be passed.
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
    options = {
      max: options,
    };
  }

  const {
    min = 0,
    max = 1,
    fractionDigits,
    multipleOf: originalMultipleOf,
    multipleOf = fractionDigits == null ? undefined : 10 ** -fractionDigits,
    distributor = uniformDistributor(),
  } = options;

  if (max < min) {
    throw new FakerError(`Max ${max} should be greater than min ${min}.`);
  }

  if (fractionDigits != null) {
    if (originalMultipleOf != null) {
      throw new FakerError(
        'multipleOf and fractionDigits cannot be set at the same time.'
      );
    }

    if (!Number.isSafeInteger(fractionDigits)) {
      throw new FakerError('fractionDigits should be an integer.');
    }

    if (fractionDigits < 0) {
      throw new FakerError(
        'fractionDigits should be greater than or equal to 0.'
      );
    }
  }

  if (multipleOf != null) {
    if (multipleOf <= 0) {
      throw new FakerError(`multipleOf should be greater than 0.`);
    }

    const logPrecision = Math.log10(multipleOf);
    const isPowerOfTenStep =
      multipleOf < 1 && Number.isSafeInteger(logPrecision);

    // For other decimal steps (0.3, 0.05, 1.5, ...) the division below picks up
    // floating-point error, e.g. 3 / (1 / 0.3) is 0.8999999999999999, below a
    // min of 0.9. When min, max and multipleOf are all finite decimals, scale
    // them to integers by a shared power of ten, pick the multiple there and
    // divide once.
    const scaleDigits = Math.max(
      decimalPlaces(min),
      decimalPlaces(max),
      decimalPlaces(multipleOf)
    );
    if (!isPowerOfTenStep && scaleDigits > 0 && Number.isFinite(scaleDigits)) {
      const scale = 10 ** scaleDigits;
      const scaledMin = Math.round(min * scale);
      const scaledMax = Math.round(max * scale);
      const scaledStep = Math.round(multipleOf * scale);
      if (
        Number.isSafeInteger(scaledMin) &&
        Number.isSafeInteger(scaledMax) &&
        Number.isSafeInteger(scaledStep)
      ) {
        const int = fakeNumberInt(fakerCore, {
          min: scaledMin,
          max: scaledMax,
          multipleOf: scaledStep,
          distributor,
        });
        return int / scale;
      }
    }

    // Workaround to get integer values for the inverse of all multiples of the form 10^-n
    const factor = isPowerOfTenStep ? 10 ** -logPrecision : 1 / multipleOf;
    const int = fakeNumberInt(fakerCore, {
      min: min * factor,
      max: max * factor,
      distributor,
    });
    return int / factor;
  }

  const real = distributor(fakerCore.randomizer);
  return real * (max - min) + min;
}

/**
 * Returns the number of decimal places of a finite decimal value (`0.05` → 2,
 * `1e-7` → 7), or `Infinity` for values like `Math.PI` or `1 / 3` that have no
 * short decimal form.
 *
 * @param value The value to inspect.
 */
function decimalPlaces(value: number): number {
  for (let digits = 0; digits <= 15; digits++) {
    const scale = 10 ** digits;
    if (Math.round(value * scale) / scale === value) {
      return digits;
    }
  }

  return Number.POSITIVE_INFINITY;
}
