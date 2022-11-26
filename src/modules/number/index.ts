import type { Faker } from '../..';
import { FakerError } from '../../errors/faker-error';
import type { Mersenne } from '../../internal/mersenne/mersenne';

/**
 * Module to generate numbers of any kind.
 */
export class NumberModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(NumberModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a single random integer between zero and the given max value or the given range.
   * The bounds are inclusive.
   *
   * @param options Maximum value or options object. Defaults to `{}`.
   * @param options.min Lower bound for generated number. Defaults to `0`.
   * @param options.max Upper bound for generated number. Defaults to `min + 99999`.
   *
   * @throws When options define `max < min`.
   *
   * @example
   * faker.number.int() // 55422
   * faker.number.int(100) // 52
   * faker.number.int({ min: 1000000 }) // 1031433
   * faker.number.int({ max: 100 }) // 42
   * faker.number.int({ min: 10, max: 100 }) // 57
   *
   * @since 8.0.0
   */
  int(options: number | { min?: number; max?: number } = {}): number {
    if (typeof options === 'number') {
      options = { max: options };
    }

    const { min = 0, max = min + 99999 } = options;

    if (max === min) {
      return min;
    }

    if (max < min) {
      throw new FakerError(`Max ${max} should be greater than min ${min}.`);
    }

    const mersenne: Mersenne =
      // @ts-expect-error: access private member field
      this.faker._mersenne;

    return mersenne.next({ min, max: max + 1 });
  }

  /**
   * Returns a single random floating-point number for a given precision or range and precision.
   *
   * @param options Precision or options object. Defaults to `{}`.
   * @param options.min Lower bound for generated number. Defaults to `0`.
   * @param options.max Upper bound for generated number. Defaults to `99999`.
   * @param options.precision Precision of the generated number. Defaults to `0.01`.
   *
   * @example
   * faker.number.float() // 51696.36
   * faker.number.float(1) // 52023.2
   * faker.number.float({ min: 1000000 }) // 212859.76
   * faker.number.float({ max: 100 }) // 28.11
   * faker.number.float({ precision: 0.1 }) // 84055.3
   * faker.number.float({ min: 10, max: 100, precision: 0.001 }) // 57.315
   *
   * @since 8.0.0
   */
  float(
    options: number | { min?: number; max?: number; precision?: number } = {}
  ): number {
    if (typeof options === 'number') {
      options = {
        precision: options,
      };
    }

    const { min = 0, max = min + 99999, precision = 0.01 } = options;

    if (max === min) {
      return min;
    }

    if (max < min) {
      throw new FakerError(`Max ${max} should be greater than min ${min}.`);
    }

    const factor = 1 / precision;
    const int = this.int({
      min: min * factor,
      max: max * factor,
    });

    return int / factor;
  }

  /**
   * Returns a lowercase [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) number.
   *
   * @param options Maximum value or options object. Defaults to `{}`.
   * @param options.min Lower bound for generated number. Defaults to `0`.
   * @param options.max Upper bound for generated number. Defaults to `min + 16`.
   *
   * @example
   * faker.number.hex() // 'b'
   * faker.number.hex(16) // '9'
   * faker.number.hex({ min: 0, max: 65536 }) // 'af17'
   *
   * @since 8.0.0
   */
  hex(options: number | { min?: number; max?: number } = {}): string {
    if (typeof options === 'number') {
      options = { max: options };
    }

    const { min = 0, max = min + 16 } = options;

    return this.int({
      max,
      min,
    }).toString(16);
  }

  /**
   * Returns a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#bigint_type) number.
   *
   * @param options Maximum value or options object. Defaults to `{}`.
   * @param options.min Lower bound for generated bigint. Defaults to `0n`.
   * @param options.max Upper bound for generated bigint. Defaults to `min + 999999999999999n`.
   *
   * @throws When options define `max < min`.
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
          min?: bigint | number | string | boolean;
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
