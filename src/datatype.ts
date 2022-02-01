import type { Faker } from '.';

export class Datatype {
  constructor(private readonly faker: Faker, seed?: any[] | any) {
    // Use a user provided seed if it is an array or number
    if (Array.isArray(seed) && seed.length) {
      this.faker.mersenne.seed_array(seed);
    } else if (!isNaN(seed)) {
      this.faker.mersenne.seed(seed);
    }

    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Datatype.prototype)) {
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
   * @param options.max Upper bound for generated number. Defaults to `99999`.
   * @param options.precision Precision of the generated number. Defaults to `1`.
   *
   * @example
   * faker.datatype.number() // 55422
   * faker.datatype.number(100) // 52
   * faker.datatype.number({ min: 1000000 }) // 431433
   * faker.datatype.number({ max: 100 }) // 42
   * faker.datatype.number({ precision: 0.01 }) // 64246.18
   * faker.datatype.number({ min: 10, max: 100, precision: 0.01 }) // 36.94
   */
  number(
    options?: number | { min?: number; max?: number; precision?: number }
  ): number {
    if (typeof options === 'number') {
      options = { max: options };
    }

    options = options ?? {};

    if (typeof options.min === 'undefined') {
      options.min = 0;
    }

    if (typeof options.max === 'undefined') {
      options.max = 99999;
    }

    if (typeof options.precision === 'undefined') {
      options.precision = 1;
    }

    // Make the range inclusive of the max value
    let max = options.max;
    if (max >= 0) {
      max += options.precision;
    }

    let randomNumber = Math.floor(
      this.faker.mersenne.rand(
        max / options.precision,
        options.min / options.precision
      )
    );
    // Workaround problem in Float point arithmetics for e.g. 6681493 / 0.01
    randomNumber = randomNumber / (1 / options.precision);

    return randomNumber;
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
    if (typeof opts.precision === 'undefined') {
      opts.precision = 0.01;
    }
    return this.faker.datatype.number(opts);
  }

  /**
   * Returns a Date object using a random number of milliseconds since
   * the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time) (1 January 1970 UTC).
   *
   * @param options Max number of milliseconds since unix epoch or options object
   * @param options.min Lower bound for milliseconds since base date.
   *    When not provided or smaller than `-8640000000000000`, `1990-01-01` is considered
   *    as minimum generated date. Defaults to `633880849813`.
   * @param options.max Upper bound for milliseconds since base date.
   *    When not provided or larger than `8640000000000000`, `2100-01-01` is considered
   *    as maximum generated date.
   */
  datetime(options?: number | { min?: number; max?: number }): Date {
    const minMax = 8640000000000000;

    let min = typeof options === 'number' ? undefined : options?.min;
    let max = typeof options === 'number' ? options : options?.max;

    if (typeof min === 'undefined' || min < minMax * -1) {
      min = new Date().setFullYear(1990, 1, 1);
    }

    if (typeof max === 'undefined' || max > minMax) {
      max = new Date().setFullYear(2100, 1, 1);
    }

    return new Date(this.faker.datatype.number({ min, max }));
  }

  /**
   * Returns a string containing UTF-16 chars between 33 and 125 ('!' to '}').
   *
   * @param length Length of the generated string. Max length is `2^20`. Defaults to `10`.
   *
   * @example
   * faker.datatype.string() // 'Zo!.:*e>wR'
   * faker.datatype.string(5) // '6Bye8'
   */
  string(length = 10): string {
    const maxLength = Math.pow(2, 20);
    if (length >= maxLength) {
      length = maxLength;
    }

    const charCodeOption = {
      min: 33,
      max: 125,
    };

    let returnString = '';

    for (let i = 0; i < length; i++) {
      returnString += String.fromCharCode(
        this.faker.datatype.number(charCodeOption)
      );
    }

    return returnString;
  }

  /**
   * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
   *
   * @example
   * faker.datatype.uuid() // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
   */
  uuid(): string {
    const RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    const replacePlaceholders = (placeholder) => {
      const random = this.faker.datatype.number({ min: 0, max: 15 });
      const value = placeholder == 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    };
    return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
  }

  /**
   * Returns the boolean value true or false.
   *
   * @example
   * faker.datatype.boolean() // false
   */
  boolean(): boolean {
    return !!this.faker.datatype.number(1);
  }

  /**
   * Returns a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) number.
   *
   * @param length Length of the generated number. Defaults to `1`.
   *
   * @example
   * faker.datatype.hexaDecimal() // '0xb'
   * faker.datatype.hexaDecimal(10) // '0xaE13F044fb'
   */
  hexaDecimal(length = 1): string {
    let wholeString = '';

    for (let i = 0; i < length; i++) {
      wholeString += this.faker.random.arrayElement([
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
      ]);
    }

    return '0x' + wholeString;
  }

  /**
   * Returns a string representing JSON object with 7 pre-defined properties.
   *
   * @example
   * faker.datatype.json() // `{"foo":"mxz.v8ISij","bar":29154,"bike":8658,"a":"GxTlw$nuC:","b":40693,"name":"%'<FTou{7X","prop":"X(bd4iT>77"}`
   */
  json(): string {
    const properties = ['foo', 'bar', 'bike', 'a', 'b', 'name', 'prop'];
    const returnObject: Record<string, string | number> = {};

    properties.forEach((prop) => {
      returnObject[prop] = this.faker.datatype.boolean()
        ? this.faker.datatype.string()
        : this.faker.datatype.number();
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
   */
  array(length = 10): Array<string | number> {
    const returnArray = new Array(length);
    for (let i = 0; i < length; i++) {
      returnArray[i] = this.faker.datatype.boolean()
        ? this.faker.datatype.string()
        : this.faker.datatype.number();
    }
    return returnArray;
  }

  /**
   * Returns a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#bigint_type) number.
   *
   * @param value When provided, this method simply converts it to `BigInt` type.
   *
   * @example
   * faker.datatype.bigInt() // 8507209999914928n
   * faker.datatype.bigInt('156') // 156n
   * faker.datatype.bigInt(30) // 30n
   * faker.datatype.bigInt(3000n) // 3000n
   * faker.datatype.bigInt(true) // 1n
   */
  bigInt(value?: string | number | bigint | boolean): bigint {
    if (value === undefined) {
      value =
        Math.floor(this.faker.datatype.number() * 99999999999) + 10000000000;
    }

    return BigInt(value);
  }
}
