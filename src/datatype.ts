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
   * Returns a single random number based on a max number or range.
   *
   * @method faker.datatype.number
   * @param options
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
   * Returns a single random floating-point number based on a max number or range.
   *
   * @method faker.datatype.float
   * @param options
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
   * Returns a Date object using a random number of milliseconds since 1. Jan 1970 UTC
   * Caveat: seeding is not working
   *
   * @method faker.datatype.datetime
   * @param options pass min OR max as number of milliseconds since 1. Jan 1970 UTC
   */
  datetime(options): Date {
    if (typeof options === 'number') {
      options = {
        max: options,
      };
    }

    const minMax = 8640000000000000;

    options = options || {};

    if (typeof options.min === 'undefined' || options.min < minMax * -1) {
      options.min = new Date().setFullYear(1990, 1, 1);
    }

    if (typeof options.max === 'undefined' || options.max > minMax) {
      options.max = new Date().setFullYear(2100, 1, 1);
    }

    const random = this.faker.datatype.number(options);
    return new Date(random);
  }

  /**
   * Returns a string, containing UTF-16 chars between 33 and 125 ('!' to '}')
   *
   * @method faker.datatype.string
   * @param length length of generated string, default = 10, max length = 2^20
   */
  string(length: number = 10): string {
    const maxLength = Math.pow(2, 20);
    if (length >= maxLength) {
      length = maxLength;
    }

    const charCodeOption = {
      min: 33,
      max: 125,
    };

    let returnString = '';

    for (var i = 0; i < length; i++) {
      returnString += String.fromCharCode(
        this.faker.datatype.number(charCodeOption)
      );
    }

    return returnString;
  }

  /**
   * uuid
   *
   * @method faker.datatype.uuid
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
   * boolean
   *
   * @method faker.datatype.boolean
   */
  boolean(): boolean {
    return !!this.faker.datatype.number(1);
  }

  /**
   * hexaDecimal
   *
   * @method faker.datatype.hexaDecimal
   * @param count defaults to 1
   */
  hexaDecimal(count: number = 1): string {
    let wholeString = '';
    for (let i = 0; i < count; i++) {
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
   * Returns random octal string of specified length.
   *
   * @method faker.datatype.octal
   * @param count defaults to 1
   */
  octal(count: number = 1): string {
    let wholeString = '';
    for (let i = 0; i < count; i++) {
      wholeString += this.faker.random.arrayElement([
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
      ]);
    }

    return '0o' + wholeString;
  }

  /**
   * Returns random binary string of specified length.
   *
   * @method faker.datatype.binary
   * @param count defaults to 1
   */
  binary(count: number = 1): string {
    let wholeString = '';
    for (let i = 0; i < count; i++) {
      wholeString += this.faker.random.arrayElement(['0', '1']);
    }

    return '0b' + wholeString;
  }

  /**
   * Returns json object with 7 pre-defined properties
   *
   * @method faker.datatype.json
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
   * Returns an array with values generated by faker.datatype.number and faker.datatype.string
   *
   * @method faker.datatype.array
   * @param length length of the returned array
   */

  array(length: number = 10): Array<string | number> {
    const returnArray = new Array(length);
    for (let i = 0; i < length; i++) {
      returnArray[i] = this.faker.datatype.boolean()
        ? this.faker.datatype.string()
        : this.faker.datatype.number();
    }
    return returnArray;
  }

  /**
   * Returns a Big Integer with values generated by faker.datatype.bigInt
   *
   * @method faker.datatype.bigInt
   * @param value
   */
  bigInt(value?: string | number | bigint | boolean): bigint {
    if (value === undefined) {
      value =
        Math.floor(this.faker.datatype.number() * 99999999999) + 10000000000;
    }

    return BigInt(value);
  }
}
