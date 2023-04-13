import { deprecated } from '../../internal/deprecated';
import { SimpleModuleBase } from '../../internal/module-base';

/**
 * Module to generate values that can be checked against JavaScript's `typeof` operator.
 *
 * ### Overview
 *
 * This module provides methods to generate values that can be checked against JavaScript's `typeof` operator.
 *
 * ```ts
 * typeof faker.datatype.bigint() === 'bigint' // true
 * typeof faker.datatype.boolean() === 'boolean' // true
 * typeof faker.datatype.function() === 'function' // true
 * typeof faker.datatype.number() === 'number' // true
 * typeof faker.datatype.object() === 'object' // true
 * typeof faker.datatype.string() === 'string' // true
 * typeof faker.datatype.symbol() === 'symbol' // true
 * typeof faker.datatype.undefined() === 'undefined' // true
 * ```
 *
 * Note that `boolean()` method can be enriched with a probability of returning `true`.
 *
 * The other methods are only intended to return a value of the specified type, but nothing more.
 *
 * If you want more specific values, use e.g. [`faker.number`](https://next.fakerjs.dev/api/number.html) or [`faker.string`](https://next.fakerjs.dev/api/string.html) module instead.
 */
export class DatatypeModule extends SimpleModuleBase {
  /**
   * Returns a value that will result in `true` when checked against JavaScript's `typeof value === 'bigint'` operator.
   *
   * @see faker.number.bigInt(): If you want to generate more specific values.
   *
   * @example
   * faker.datatype.bigint() // 55422n
   *
   * @since 8.0.0
   */
  bigint(): bigint {
    return this.faker.number.bigInt();
  }

  /**
   * Returns a value that will result in `true` when checked against JavaScript's `typeof value === 'boolean'` operator.
   *
   * **Note:**
   * A probability of `0.75` results in `true` being returned `75%` of the calls; likewise `0.3` => `30%`.
   * If the probability is `<= 0.0`, it will always return `false`.
   * If the probability is `>= 1.0`, it will always return `true`.
   *
   * @param options The optional options object or the probability (`[0.00, 1.00]`) of returning `true`. Defaults to `0.5`.
   * @param options.probability The probability (`[0.00, 1.00]`) of returning `true`. Defaults to `0.5`.
   *
   * @example
   * faker.datatype.boolean() // false
   * faker.datatype.boolean(0.9) // true
   * faker.datatype.boolean({ probability: 0.1 }) // false
   *
   * @since 5.5.0
   */
  boolean(
    options:
      | number
      | {
          /**
           * The probability (`[0.00, 1.00]`) of returning `true`.
           *
           * @default 0.5
           */
          probability?: number;
        } = {}
  ): boolean {
    if (typeof options === 'number') {
      options = {
        probability: options,
      };
    }

    const { probability = 0.5 } = options;
    if (probability <= 0) {
      return false;
    }

    if (probability >= 1) {
      // This check is required to avoid returning false when float() returns 1
      return true;
    }

    return this.faker.number.float() < probability;
  }

  /**
   * Returns a value that will result in `true` when checked against JavaScript's `typeof value === 'function'` operator.
   *
   * **Note:**
   * The returned function can be empty, throw an error, return a promise or return a value of any type.
   *
   * @example
   * faker.datatype.function() // () => ({})
   * faker.datatype.function() // () => 55422n
   * faker.datatype.function() // () => false
   * faker.datatype.function() // () => Promise.resolve()
   *
   * @since 8.0.0
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function(): () => any {
    return this.faker.helpers.weightedArrayElement<() => unknown>([
      {
        weight: 1,
        value: () => {
          // empty function
        },
      },
      {
        weight: 8,
        value: () =>
          // TODO @Shinigami92 2023-04-14: This can later be refactored with `faker.helpers.objectValues(this)()` when the deprecated methods are removed
          this[
            this.faker.helpers.arrayElement([
              'bigint',
              'boolean',
              'function',
              'number',
              'object',
              'string',
              'symbol',
              'undefined',
            ] as const)
          ](),
      },
      {
        weight: 1,
        value: () => {
          // eslint-disable-next-line unicorn/error-message
          throw new Error();
        },
      },
      {
        weight: 1,
        value: () => Promise.resolve(),
      },
      {
        weight: 1,
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        value: () => Promise.reject(),
      },
      {
        weight: 1,
        value: () =>
          new Promise(() => {
            // empty promise that does not resolve or reject
          }),
      },
    ]);
  }

  /**
   * Returns a value that will result in `true` when checked against JavaScript's `typeof value === 'number'` operator.
   *
   * @param options This parameter does nothing and is deprecated. Use `faker.number.float(options)` instead.
   *
   * @see faker.number.int(): If you want to generate more specific values.
   * @see faker.number.float(): If you want to generate more specific values.
   *
   * @example
   * faker.datatype.number() // 55422
   * faker.datatype.number() // 0.5688541042618454
   * faker.datatype.number() // NaN
   * faker.datatype.number() // Infinity
   * faker.datatype.number() // Number.POSITIVE_INFINITY
   * faker.datatype.number() // Number.NEGATIVE_INFINITY
   *
   * @since 5.5.0
   */
  number(options?: unknown): number {
    if (options != null) {
      deprecated({
        deprecated: 'faker.datatype.number(options)',
        proposed: 'faker.number.float(options)',
        since: '8.0',
        until: '9.0',
      });
    }

    return this.faker.helpers.weightedArrayElement([
      { weight: 1, value: () => this.faker.number.float() },
      { weight: 1, value: () => this.faker.number.int() },
      { weight: 1, value: () => Number.NaN },
      { weight: 1, value: () => Number.POSITIVE_INFINITY },
      { weight: 1, value: () => Number.POSITIVE_INFINITY },
      { weight: 1, value: () => Number.NEGATIVE_INFINITY },
    ])();
  }

  /**
   * Returns a value that will result in `true` when checked against JavaScript's `typeof value === 'object'` operator.
   *
   * @example
   * faker.datatype.object() // {}
   * faker.datatype.object() // []
   * faker.datatype.object() // new Date()
   * faker.datatype.object() // null
   *
   * @since 8.0.0
   */
  object(): unknown {
    return this.faker.helpers.weightedArrayElement<() => unknown>([
      { weight: 1, value: () => ({}) },
      { weight: 1, value: () => [] },
      {
        weight: 1,
        value: () =>
          this.faker.date.between({
            from: Date.UTC(1970, 0),
            to: Date.UTC(2200, 0),
          }),
      },
      { weight: 1, value: () => null },
    ])();
  }

  /**
   * Returns a value that will result in `true` when checked against JavaScript's `typeof value === 'string'` operator.
   *
   * @param length This parameter does nothing and is deprecated. Use `faker.string.sample(length)` instead.
   *
   * @see faker.string.sample() If you want to generate more specific values.
   *
   * @example
   * faker.datatype.string() // 'Zo!.:*e>wR'
   *
   * @since 5.5.0
   */
  string(length?: unknown): string {
    if (length != null) {
      deprecated({
        deprecated: 'faker.datatype.string(length)',
        proposed: 'faker.string.sample(length)',
        since: '8.0',
        until: '9.0',
      });
    }

    return this.faker.helpers.weightedArrayElement([
      { weight: 1, value: () => this.faker.string.sample() },
      { weight: 1, value: () => '' },
    ])();
  }

  /**
   * Returns a value that will result in `true` when checked against JavaScript's `typeof value === 'symbol'` operator.
   *
   * @example
   * faker.datatype.symbol() // Symbol('fEcAaCVbaR')
   *
   * @since 8.0.0
   */
  symbol(): symbol {
    return Symbol(this.faker.string.alpha({ length: { min: 3, max: 20 } }));
  }

  /**
   * Returns a value that will result in `true` when checked against JavaScript's `typeof value === 'undefined'` operator.
   *
   * @example
   * faker.datatype.undefined() // undefined
   * faker.datatype.undefined() // void 0
   *
   * @since 8.0.0
   */
  undefined(): undefined {
    return this.faker.helpers.arrayElement<undefined>([undefined, void 0]);
  }

  // Deprecated methods

  /**
   * Returns a single random floating-point number for the given precision or range and precision.
   *
   * @param options Precision or options object.
   * @param options.min Lower bound for generated number. Defaults to `0`.
   * @param options.max Upper bound for generated number. Defaults to `min + 99999`.
   * @param options.precision Precision of the generated number. Defaults to `0.01`.
   *
   * @throws When `min` is greater than `max`.
   * @throws When `precision` is negative.
   *
   * @see faker.number.float(): For the replacement method.
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
   *
   * @deprecated Use `faker.number.float()` instead.
   */
  float(
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
           * @default min + 99999
           */
          max?: number;
          /**
           * Precision of the generated number.
           *
           * @default 0.01
           */
          precision?: number;
        } = {}
  ): number {
    deprecated({
      deprecated: 'faker.datatype.float()',
      proposed: 'faker.number.float()',
      since: '8.0',
      until: '9.0',
    });

    if (typeof options === 'number') {
      options = {
        precision: options,
      };
    }

    const { min = 0, max = min + 99999, precision = 0.01 } = options;

    return this.faker.number.float({ min, max, multipleOf: precision });
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
   * @see faker.date.anytime(): For generating a random date in either the past or future.
   * @see faker.date.between(): For generating a random date in between two dates.
   *
   * @example
   * faker.datatype.datetime() // '2089-04-17T18:03:24.956Z'
   * faker.datatype.datetime(1893456000000) // '2022-03-28T07:00:56.876Z'
   * faker.datatype.datetime({ min: 1577836800000, max: 1893456000000 }) // '2021-09-12T07:13:00.255Z'
   *
   * @since 5.5.0
   *
   * @deprecated Use `faker.date.between({ from: min, to: max })` or `faker.date.anytime()` instead.
   */
  datetime(
    options:
      | number
      | {
          /**
           * Lower bound for milliseconds since base date.
           *
           * When not provided or smaller than `-8640000000000000`, `1990-01-01` is considered as minimum generated date.
           *
           * @default 631152000000
           */
          min?: number;
          /**
           * Upper bound for milliseconds since base date.
           *
           * When not provided or larger than `8640000000000000`, `2100-01-01` is considered as maximum generated date.
           *
           * @default 4102444800000
           */
          max?: number;
        } = {}
  ): Date {
    deprecated({
      deprecated: 'faker.datatype.datetime({ min, max })',
      proposed: 'faker.date.between({ from, to }) or faker.date.anytime()',
      since: '8.0',
      until: '9.0',
    });

    const minMax = 8640000000000000;

    let min = typeof options === 'number' ? undefined : options.min;
    let max = typeof options === 'number' ? options : options.max;

    if (min == null || min < minMax * -1) {
      min = Date.UTC(1990, 0);
    }

    if (max == null || max > minMax) {
      max = Date.UTC(2100, 0);
    }

    return this.faker.date.between({ from: min, to: max });
  }

  /**
   * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
   *
   * @see faker.string.uuid(): For the replacement method.
   *
   * @example
   * faker.datatype.uuid() // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
   *
   * @since 5.5.0
   *
   * @deprecated Use `faker.string.uuid()` instead.
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
   * Returns a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) number.
   *
   * @param options The optional options object.
   * @param options.length Length of the generated number. Defaults to `1`.
   * @param options.prefix Prefix for the generated number. Defaults to `'0x'`.
   * @param options.case Case of the generated number. Defaults to `'mixed'`.
   *
   * @see faker.string.hexadecimal(): For generating a random hexadecimal string.
   * @see faker.number.hex(): For generating a random hexadecimal number.
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
   * @deprecated Use `faker.string.hexadecimal()` or `faker.number.hex()` instead.
   */
  hexadecimal(
    options: {
      /**
       * Length of the generated number.
       *
       * @default 1
       */
      length?: number;
      /**
       * Prefix for the generated number.
       *
       * @default '0x'
       */
      prefix?: string;
      /**
       * Case of the generated number.
       *
       * @default 'mixed'
       */
      case?: 'lower' | 'upper' | 'mixed';
    } = {}
  ): string {
    deprecated({
      deprecated: 'faker.datatype.hexadecimal()',
      proposed: 'faker.string.hexadecimal() or faker.number.hex()',
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
   *
   * @deprecated Build your own function to generate complex objects.
   */
  json(): string {
    deprecated({
      deprecated: 'faker.datatype.json()',
      proposed: 'your own function to generate complex objects',
      since: '8.0',
      until: '9.0',
    });

    const properties = ['foo', 'bar', 'bike', 'a', 'b', 'name', 'prop'];
    const returnObject: Record<string, string | number> = {};

    for (const prop of properties) {
      returnObject[prop] = this.boolean()
        ? this.faker.string.sample()
        : this.faker.number.int();
    }

    return JSON.stringify(returnObject);
  }

  /**
   * Returns an array with random strings and numbers.
   *
   * @param length Size of the returned array. Defaults to `10`.
   * @param length.min The minimum size of the array.
   * @param length.max The maximum size of the array.
   *
   * @example
   * faker.datatype.array() // [ 94099, 85352, 'Hz%T.C\\l;8', '|#gmtw3otS', '2>:rJ|3$&d', 56864, 'Ss2-p0RXSI', 51084, 2039, 'mNEU[.r0Vf' ]
   * faker.datatype.array(3) // [ 61845, 'SK7H$W3:d*', 'm[%7N8*GVK' ]
   * faker.datatype.array({ min: 3, max: 5 }) // [ 99403, 76924, 42281, "Q'|$&y\\G/9" ]
   *
   * @since 5.5.0
   *
   * @deprecated Use your own function to build complex arrays.
   */
  array(
    length:
      | number
      | {
          /**
           * The minimum size of the array.
           */
          min: number;
          /**
           * The maximum size of the array.
           */
          max: number;
        } = 10
  ): Array<string | number> {
    deprecated({
      deprecated: 'faker.datatype.array()',
      proposed: 'your own function to build complex arrays',
      since: '8.0',
      until: '9.0',
    });

    return this.faker.helpers.multiple(
      () =>
        this.boolean() ? this.faker.string.sample() : this.faker.number.int(),
      { count: length }
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
   * @see faker.number.bigInt(): For the replacement method.
   *
   * @example
   * faker.datatype.bigInt() // 55422n
   * faker.datatype.bigInt(100n) // 52n
   * faker.datatype.bigInt({ min: 1000000n }) // 431433n
   * faker.datatype.bigInt({ max: 100n }) // 42n
   * faker.datatype.bigInt({ min: 10n, max: 100n }) // 36n
   *
   * @since 6.0.0
   *
   * @deprecated Use `faker.number.bigInt()` instead.
   */
  bigInt(
    options?:
      | bigint
      | boolean
      | number
      | string
      | {
          /**
           * Lower bound for generated bigint.
           *
           * @default 0n
           */
          min?: bigint | boolean | number | string;
          /**
           * Upper bound for generated bigint.
           *
           * @default min + 999999999999999n
           */
          max?: bigint | boolean | number | string;
        }
  ): bigint {
    deprecated({
      deprecated: 'faker.datatype.bigInt()',
      proposed: 'faker.number.bigInt()',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.number.bigInt(options);
  }
}
