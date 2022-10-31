import type { Faker } from '../..';
import { FakerError } from '../../errors/faker-error';
import { deprecated } from '../../internal/deprecated';
import type { Mersenne } from '../../internal/mersenne/mersenne';

/**
 * Module to generate various primitive values and data types.
 */
export class DatatypeModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(DatatypeModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a single random number between zero and the given max value or the given range with the specified precision.
   * The bounds are inclusive.
   *
   * @param options Maximum value or options object.
   * @param options.min Lower bound for generated number. Defaults to `0`.
   * @param options.max Upper bound for generated number. Defaults to `min + 99999`.
   * @param options.precision Precision of the generated number. Defaults to `1`.
   *
   * @throws When options define `max < min`.
   *
   * @example
   * faker.datatype.number() // 55422
   * faker.datatype.number(100) // 52
   * faker.datatype.number({ min: 1000000 }) // 1031433
   * faker.datatype.number({ max: 100 }) // 42
   * faker.datatype.number({ precision: 0.01 }) // 64246.18
   * faker.datatype.number({ min: 10, max: 100, precision: 0.01 }) // 36.94
   *
   * @since 5.5.0
   */
  number(
    options: number | { min?: number; max?: number; precision?: number } = 99999
  ): number {
    if (typeof options === 'number') {
      options = { max: options };
    }

    const { min = 0, precision = 1 } = options;
    const max = options.max ?? min + 99999;

    if (max === min) {
      return min;
    }

    if (max < min) {
      throw new FakerError(`Max ${max} should be greater than min ${min}.`);
    }

    const mersenne: Mersenne =
      // @ts-expect-error: access private member field
      this.faker._mersenne;

    const randomNumber = mersenne.next({
      min: min / precision,
      max: max / precision + 1,
    });

    // Workaround problem in float point arithmetics for e.g. 6681493 / 0.01
    return randomNumber / (1 / precision);
  }

  /**
   * Returns a single random floating-point number for the given precision or range and precision.
   *
   * @param options Precision or options object.
   * @param options.min Lower bound for generated number. Defaults to `0`.
   * @param options.max Upper bound for generated number. Defaults to `99999`.
   * @param options.precision Precision of the generated number. Defaults to `0.01`.
   *
   * @example
   * faker.datatype.float() // 51696.36
   * faker.datatype.float(0.1) // 52023.2
   * faker.datatype.float({ min: 1000000 }) // 212859.76
   * faker.datatype.float({ max: 100 }) // 28.11
   * faker.datatype.float({ precision: 0.1 }) // 84055.3
   * faker.datatype.float({ min: 10, max: 100, precision: 0.001 }) // 57.315
   *
   * @since 5.5.0
   */
  float(
    options?: number | { min?: number; max?: number; precision?: number }
  ): number {
    if (typeof options === 'number') {
      options = {
        precision: options,
      };
    }
    options = options || {};
    const opts: { precision?: number } = {};
    for (const p in options) {
      opts[p] = options[p];
    }
    if (opts.precision == null) {
      opts.precision = 0.01;
    }
    return this.number(opts);
  }

  /**
   * Returns a Date object using a random number of milliseconds since
   * the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time) (1 January 1970 UTC).
   *
   * @param options Max number of milliseconds since unix epoch or options object.
   * @param options.min Lower bound for milliseconds since base date.
   *    When not provided or smaller than `-8640000000000000`, `1990-01-01` is considered
   *    as minimum generated date. Defaults to `631152000000`.
   * @param options.max Upper bound for milliseconds since base date.
   *    When not provided or larger than `8640000000000000`, `2100-01-01` is considered
   *    as maximum generated date. Defaults to `4102444800000`.
   *
   * @example
   * faker.datatype.datetime() // '2089-04-17T18:03:24.956Z'
   * faker.datatype.datetime(1893456000000) // '2022-03-28T07:00:56.876Z'
   * faker.datatype.datetime({ min: 1577836800000, max: 1893456000000 }) // '2021-09-12T07:13:00.255Z'
   *
   * @since 5.5.0
   */
  datetime(options: number | { min?: number; max?: number } = {}): Date {
    const minMax = 8640000000000000;

    let min = typeof options === 'number' ? undefined : options.min;
    let max = typeof options === 'number' ? options : options.max;

    if (min == null || min < minMax * -1) {
      min = Date.UTC(1990, 0);
    }

    if (max == null || max > minMax) {
      max = Date.UTC(2100, 0);
    }

    return new Date(this.number({ min, max }));
  }

  /**
   * Returns a string containing UTF-16 chars between 33 and 125 (`!` to `}`).
   *
   * @param length Length of the generated string. Max length is `2^20`. Defaults to `10`.
   *
   * @see faker.string.sample()
   *
   * @example
   * faker.datatype.string() // 'Zo!.:*e>wR'
   * faker.datatype.string(5) // '6Bye8'
   *
   * @since 5.5.0
   *
   * @deprecated Use faker.string.sample() instead.
   */
  string(length = 10): string {
    deprecated({
      deprecated: 'faker.datatype.string()',
      proposed: 'faker.string.sample()',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.string.sample(length);
  }

  /**
   * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
   *
   * @see faker.string.uuid()
   *
   * @example
   * faker.datatype.uuid() // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
   *
   * @since 5.5.0
   *
   * @deprecated Use faker.string.uuid() instead.
   */
  uuid(): string {
    deprecated({
      deprecated: 'faker.datatype.uuid()',
      proposed: 'faker.string.uuid()',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.string.uuid();
  }

  /**
   * Returns the boolean value true or false.
   *
   * @example
   * faker.datatype.boolean() // false
   *
   * @since 5.5.0
   */
  boolean(): boolean {
    return !!this.number(1);
  }

  /**
   * Returns a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) number.
   *
   * @param options The optional options object.
   * @param options.length Length of the generated number. Defaults to `1`.
   * @param options.prefix Prefix for the generated number. Defaults to `'0x'`.
   * @param options.case Case of the generated number. Defaults to `'mixed'`.
   *
   * @see faker.string.hexadecimal()
   *
   * @example
   * faker.datatype.hexadecimal() // '0xB'
   * faker.datatype.hexadecimal({ length: 10 }) // '0xaE13d044cB'
   * faker.datatype.hexadecimal({ prefix: '0x' }) // '0xE'
   * faker.datatype.hexadecimal({ case: 'lower' }) // '0xf'
   * faker.datatype.hexadecimal({ length: 10, prefix: '#' }) // '#f12a974eB1'
   * faker.datatype.hexadecimal({ length: 10, case: 'upper' }) // '0xE3F38014FB'
   * faker.datatype.hexadecimal({ prefix: '', case: 'lower' }) // 'd'
   * faker.datatype.hexadecimal({ length: 10, prefix: '0x', case: 'mixed' }) // '0xAdE330a4D1'
   *
   * @since 6.1.2
   *
   * @deprecated Use `faker.string.hexadecimal()` instead.
   */
  hexadecimal(
    options: {
      length?: number;
      prefix?: string;
      case?: 'lower' | 'upper' | 'mixed';
    } = {}
  ): string {
    deprecated({
      deprecated: 'faker.datatype.hexadecimal()',
      proposed: 'faker.string.hexadecimal()',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.string.hexadecimal({ ...options, casing: options.case });
  }

  /**
   * Returns a string representing JSON object with 7 pre-defined properties.
   *
   * @example
   * faker.datatype.json() // `{"foo":"mxz.v8ISij","bar":29154,"bike":8658,"a":"GxTlw$nuC:","b":40693,"name":"%'<FTou{7X","prop":"X(bd4iT>77"}`
   *
   * @since 5.5.0
   */
  json(): string {
    const properties = ['foo', 'bar', 'bike', 'a', 'b', 'name', 'prop'];
    const returnObject: Record<string, string | number> = {};

    properties.forEach((prop) => {
      returnObject[prop] = this.boolean()
        ? this.faker.string.sample()
        : this.number();
    });

    return JSON.stringify(returnObject);
  }

  /**
   * Returns an array with random strings and numbers.
   *
   * @param length Size of the returned array. Defaults to `10`.
   *
   * @example
   * faker.datatype.array() // [ 94099, 85352, 'Hz%T.C\\l;8', '|#gmtw3otS', '2>:rJ|3$&d', 56864, 'Ss2-p0RXSI', 51084, 2039, 'mNEU[.r0Vf' ]
   * faker.datatype.array(3) // [ 61845, 'SK7H$W3:d*', 'm[%7N8*GVK' ]
   *
   * @since 5.5.0
   */
  array(length = 10): Array<string | number> {
    return Array.from<string | number>({ length }).map(() =>
      this.boolean() ? this.faker.string.sample() : this.number()
    );
  }

  /**
   * Returns a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#bigint_type) number.
   *
   * @param options Maximum value or options object.
   * @param options.min Lower bound for generated bigint. Defaults to `0n`.
   * @param options.max Upper bound for generated bigint. Defaults to `min + 999999999999999n`.
   *
   * @throws When options define `max < min`.
   *
   * @example
   * faker.datatype.bigInt() // 55422n
   * faker.datatype.bigInt(100n) // 52n
   * faker.datatype.bigInt({ min: 1000000n }) // 431433n
   * faker.datatype.bigInt({ max: 100n }) // 42n
   * faker.datatype.bigInt({ min: 10n, max: 100n }) // 36n
   *
   * @since 6.0.0
   */
  bigInt(
    options?:
      | bigint
      | boolean
      | number
      | string
      | {
          min?: bigint | boolean | number | string;
          max?: bigint | boolean | number | string;
        }
  ): bigint {
    let min: bigint;
    let max: bigint;

    if (typeof options === 'object') {
      min = BigInt(options.min ?? 0);
      max = BigInt(options.max ?? min + BigInt(999999999999999));
    } else {
      min = BigInt(0);
      max = BigInt(options ?? 999999999999999);
    }

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
