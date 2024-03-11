import { FakerError } from '../../errors/faker-error';
import { deprecated } from '../../internal/deprecated';
import { SimpleModuleBase } from '../../internal/module-base';

/**
 * Module to generate numbers of any kind.
 *
 * ### Overview
 *
 * For simple integers, use [`int()`](https://fakerjs.dev/api/number.html#int). For decimal/floating-point numbers, use [`float()`](https://fakerjs.dev/api/number.html#float).
 *
 * For numbers not in base-10, you can use [`hex()`](https://fakerjs.dev/api/number.html#hex), [`octal()`](https://fakerjs.dev/api/number.html#octal) and [`binary()`](https://fakerjs.dev/api/number.html#binary)`.
 *
 * ### Related modules
 *
 * - For numeric strings of a given length, use [`faker.string.numeric()`](https://fakerjs.dev/api/string.html#numeric).
 * - For credit card numbers, use [`faker.finance.creditCardNumber()`](https://fakerjs.dev/api/finance.html#creditcardnumber).
 */
export class NumberModule extends SimpleModuleBase {
  /**
   * Returns a single random integer between zero and the given max value or the given range.
   * The bounds are inclusive.
   *
   * @param options Maximum value or options object.
   * @param options.min Lower bound for generated number. Defaults to `0`.
   * @param options.max Upper bound for generated number. Defaults to `Number.MAX_SAFE_INTEGER`.
   * @param options.multipleOf Generated number will be a multiple of the given integer. Defaults to `1`.
   *
   * @throws When `min` is greater than `max`.
   * @throws When there are no suitable integers between `min` and `max`.
   * @throws When `multipleOf` is not a positive integer.
   *
   * @see faker.string.numeric(): For generating a `string` of digits with a given length (range).
   *
   * @example
   * faker.number.int() // 2900970162509863
   * faker.number.int(100) // 52
   * faker.number.int({ min: 1000000 }) // 2900970162509863
   * faker.number.int({ max: 100 }) // 42
   * faker.number.int({ min: 10, max: 100 }) // 57
   * faker.number.int({ min: 10, max: 100, multipleOf: 10 }) // 50
   *
   * @since 8.0.0
   */
  int(
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
        } = {}
  ): number {
    if (typeof options === 'number') {
      options = { max: options };
    }

    const { min = 0, max = Number.MAX_SAFE_INTEGER, multipleOf = 1 } = options;
    const effectiveMin = Math.ceil(min);
    const effectiveMax = Math.floor(max);

    if (effectiveMin === effectiveMax) {
      return effectiveMin;
    }

    if (effectiveMax < effectiveMin) {
      if (max >= min) {
        throw new FakerError(
          `No integer value between ${min} and ${max} found.`
        );
      }

      throw new FakerError(`Max ${max} should be greater than min ${min}.`);
    }

    if (!Number.isInteger(multipleOf)) {
      throw new FakerError(`multipleOf should be an integer.`);
    }

    if (multipleOf <= 0) {
      throw new FakerError(`multipleOf should be greater than 0.`);
    }

    // @ts-expect-error: access private member field
    const randomizer = this.faker._randomizer;
    const real = randomizer.next();
    if (multipleOf > 1) {
      const minMultiple = Math.ceil(effectiveMin / multipleOf) * multipleOf;
      const maxMultiple = Math.floor(effectiveMax / multipleOf) * multipleOf;
      if (maxMultiple < minMultiple) {
        throw new FakerError(
          `No suitable integer value between ${min} and ${max} found.`
        );
      }

      const delta = (maxMultiple - minMultiple) / multipleOf + 1;
      return Math.floor(real * delta) * multipleOf + minMultiple;
    }

    return Math.floor(real * (effectiveMax + 1 - effectiveMin) + effectiveMin);
  }

  /**
   * Returns a single random floating-point number, by default between `0.0` and `1.0`. To change the range, pass a `min` and `max` value. To limit the number of decimal places, pass a `multipleOf` or `fractionDigits` parameter.
   *
   * @param options Upper bound or options object.
   * @param options.min Lower bound for generated number, inclusive. Defaults to `0.0`.
   * @param options.max Upper bound for generated number, exclusive, unless `multipleOf`, `precision` or `fractionDigits` are passed. Defaults to `1.0`.
   * @param options.precision Deprecated alias for `multipleOf`. Only one of `multipleOf`, `precision` or `fractionDigits` should be passed.
   * @param options.multipleOf The generated number will be a multiple of this parameter. Only one of `multipleOf`, `precision` or `fractionDigits` should be passed.
   * @param options.fractionDigits The maximum number of digits to appear after the decimal point, for example `2` will round to 2 decimal points.  Only one of `multipleOf`, `precision` or `fractionDigits` should be passed.
   *
   * @throws When `min` is greater than `max`.
   * @throws When `precision` is negative.
   * @throws When `multipleOf` is negative.
   * @throws When `fractionDigits` is negative.
   * @throws When `fractionDigits` and `multipleOf` is passed in the same options object.
   *
   * @example
   * faker.number.float() // 0.5688541042618454
   * faker.number.float(3) // 2.367973240558058
   * faker.number.float({ max: 100 }) // 17.3687307164073
   * faker.number.float({ min: 20, max: 30 }) // 23.94764115102589
   * faker.number.float({ multipleOf: 0.25, min: 0, max:10 }) // 7.75
   * faker.number.float({ fractionDigits: 1 }) // 0.9
   * faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }) // 35.42
   * faker.number.float({ min: 10, max: 100, fractionDigits: 3 }) // 65.716
   * faker.number.float({ min: 10, max: 100, multipleOf: 0.001 }) // 65.716 - same as above
   *
   * @since 8.0.0
   */
  float(
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
           * Upper bound for generated number, exclusive, unless `multipleOf`, `precision` or `fractionDigits` are passed.
           *
           * @default 1.0
           */
          max?: number;
          /**
           * The maximum number of digits to appear after the decimal point, for example `2` will round to 2 decimal points.  Only one of `multipleOf`, `precision` or `fractionDigits` should be passed.
           */
          fractionDigits?: number;
          /**
           * Deprecated alias for `multipleOf`. Only one of `multipleOf`, `precision` or `fractionDigits` should be passed.
           *
           * @deprecated Use `multipleOf` instead.
           */
          precision?: number;
          /**
           * The generated number will be a multiple of this parameter. Only one of `multipleOf`, `precision` or `fractionDigits` should be passed.
           */
          multipleOf?: number;
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
      // eslint-disable-next-line deprecation/deprecation
      precision,
      // eslint-disable-next-line deprecation/deprecation
      multipleOf: originalMultipleOf = precision,
      multipleOf = precision ??
        (fractionDigits == null ? undefined : 10 ** -fractionDigits),
    } = options;

    if (precision != null) {
      deprecated({
        deprecated: 'faker.number.float({ precision })',
        proposed: 'faker.number.float({ multipleOf })',
        since: '8.4',
        until: '9.0',
      });
    }

    if (max === min) {
      return min;
    }

    if (max < min) {
      throw new FakerError(`Max ${max} should be greater than min ${min}.`);
    }

    if (fractionDigits != null) {
      if (originalMultipleOf != null) {
        throw new FakerError(
          'multipleOf and fractionDigits cannot be set at the same time.'
        );
      }

      if (!Number.isInteger(fractionDigits)) {
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
        // TODO @xDivisionByZerox: Clean up in v9.0
        throw new FakerError(`multipleOf/precision should be greater than 0.`);
      }

      const logPrecision = Math.log10(multipleOf);
      // Workaround to get integer values for the inverse of all multiples of the form 10^-n
      const factor =
        multipleOf < 1 && Number.isInteger(logPrecision)
          ? 10 ** -logPrecision
          : 1 / multipleOf;
      const int = this.int({
        min: min * factor,
        max: max * factor,
      });
      return int / factor;
    }

    // @ts-expect-error: access private member field
    const randomizer = this.faker._randomizer;
    const real = randomizer.next();
    return real * (max - min) + min;
  }

  /**
   * Returns a [binary](https://en.wikipedia.org/wiki/Binary_number) number.
   * The bounds are inclusive.
   *
   * @param options Maximum value or options object.
   * @param options.min Lower bound for generated number. Defaults to `0`.
   * @param options.max Upper bound for generated number. Defaults to `1`.
   *
   * @throws When `min` is greater than `max`.
   * @throws When there are no integers between `min` and `max`.
   *
   * @see faker.string.binary(): For generating a `binary string` with a given length (range).
   *
   * @example
   * faker.number.binary() // '1'
   * faker.number.binary(255) // '110101'
   * faker.number.binary({ min: 0, max: 65535 }) // '10110101'
   *
   * @since 8.0.0
   */
  binary(
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

    return this.int({
      max,
      min,
    }).toString(2);
  }

  /**
   * Returns an [octal](https://en.wikipedia.org/wiki/Octal) number.
   * The bounds are inclusive.
   *
   * @param options Maximum value or options object.
   * @param options.min Lower bound for generated number. Defaults to `0`.
   * @param options.max Upper bound for generated number. Defaults to `7`.
   *
   * @throws When `min` is greater than `max`.
   * @throws When there are no integers between `min` and `max`.
   *
   * @see faker.string.octal(): For generating an `octal string` with a given length (range).
   *
   * @example
   * faker.number.octal() // '5'
   * faker.number.octal(255) // '377'
   * faker.number.octal({ min: 0, max: 65535 }) // '4766'
   *
   * @since 8.0.0
   */
  octal(
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

    return this.int({
      max,
      min,
    }).toString(8);
  }

  /**
   * Returns a lowercase [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) number.
   * The bounds are inclusive.
   *
   * @param options Maximum value or options object.
   * @param options.min Lower bound for generated number. Defaults to `0`.
   * @param options.max Upper bound for generated number. Defaults to `15`.
   *
   * @throws When `min` is greater than `max`.
   * @throws When there are no integers between `min` and `max`.
   *
   * @example
   * faker.number.hex() // 'b'
   * faker.number.hex(255) // '9d'
   * faker.number.hex({ min: 0, max: 65535 }) // 'af17'
   *
   * @since 8.0.0
   */
  hex(
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

    return this.int({
      max,
      min,
    }).toString(16);
  }

  /**
   * Returns a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#bigint_type) number.
   * The bounds are inclusive.
   *
   * @param options Maximum value or options object.
   * @param options.min Lower bound for generated bigint. Defaults to `0n`.
   * @param options.max Upper bound for generated bigint. Defaults to `min + 999999999999999n`.
   *
   * @throws When `min` is greater than `max`.
   *
   * @example
   * faker.number.bigInt() // 55422n
   * faker.number.bigInt(100n) // 52n
   * faker.number.bigInt({ min: 1000000n }) // 431433n
   * faker.number.bigInt({ max: 100n }) // 42n
   * faker.number.bigInt({ min: 10n, max: 100n }) // 36n
   *
   * @since 8.0.0
   */
  bigInt(
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

    if (max === min) {
      return min;
    }

    if (max < min) {
      throw new FakerError(`Max ${max} should be larger then min ${min}.`);
    }

    const delta = max - min;

    const offset =
      BigInt(
        this.faker.string.numeric({
          length: delta.toString(10).length,
          allowLeadingZeros: true,
        })
      ) %
      (delta + BigInt(1));

    return min + offset;
  }
}
