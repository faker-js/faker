import type { Faker } from '.';

/**
 * Method to reduce array of characters.
 *
 * @param arr existing array of characters
 * @param values array of characters which should be removed
 * @returns new array without banned characters
 */
function arrayRemove<T>(arr: T[], values: T[]): T[] {
  values.forEach((value) => {
    arr = arr.filter((ele) => ele !== value);
  });
  return arr;
}

/**
 * Generates random values of different kinds. Some methods are deprecated and have been moved to dedicated modules.
 */
export class Random {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Random.prototype)) {
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
   * @see faker.datatype.number()
   *
   * @example
   * faker.random.number() // 55422
   * faker.random.number(100) // 52
   * faker.random.number({ min: 1000000 }) // 431433
   * faker.random.number({ max: 100 }) // 42
   * faker.random.number({ precision: 0.01 }) // 64246.18
   * faker.random.number({ min: 10, max: 100, precision: 0.01 }) // 36.94
   *
   * @deprecated
   */
  number(
    options?: number | { min?: number; max?: number; precision?: number }
  ): number {
    console.warn(
      'Deprecation Warning: faker.random.number is now located in faker.datatype.number'
    );
    return this.faker.datatype.number(options);
  }

  /**
   * Returns a single random floating-point number for the given precision or range and precision.
   *
   * @param options Precision or options object.
   * @param options.min Lower bound for generated number. Defaults to `0`.
   * @param options.max Upper bound for generated number. Defaults to `99999`.
   * @param options.precision Precision of the generated number. Defaults to `0.01`.
   *
   * @see faker.datatype.float()
   *
   * @example
   * faker.random.float() // 51696.36
   * faker.random.float(0.1) // 52023.2
   * faker.random.float({ min: 1000000 }) // 212859.76
   * faker.random.float({ max: 100 }) // 28.11
   * faker.random.float({ precision: 0.1 }) // 84055.3
   * faker.random.float({ min: 10, max: 100, precision: 0.001 }) // 57.315
   *
   * @deprecated
   */
  float(
    options?: number | { min?: number; max?: number; precision?: number }
  ): number {
    console.warn(
      'Deprecation Warning: faker.random.float is now located in faker.datatype.float'
    );
    return this.faker.datatype.float(options);
  }

  /**
   * Returns random element from the given array.
   *
   * @template T The type of the entries to pick from.
   * @param array Array to pick the value from. Defaults to `['a', 'b', 'c']`.
   *
   * @example
   * faker.random.arrayElement() // 'b'
   * faker.random.arrayElement(['cat', 'dog', 'mouse']) // 'dog'
   */
  arrayElement<T = string>(
    array: ReadonlyArray<T> = ['a', 'b', 'c'] as unknown as ReadonlyArray<T>
  ): T {
    const r = this.faker.datatype.number({ max: array.length - 1 });
    return array[r];
  }

  /**
   * Returns a subset with random elements of the given array in random order.
   *
   * @template T The type of the entries to pick from.
   * @param array Array to pick the value from. Defaults to `['a', 'b', 'c']`.
   * @param count Number of elements to pick.
   *    When not provided, random number of elements will be picked.
   *    When value exceeds array boundaries, it will be limited to stay inside.
   *
   * @example
   * faker.random.arrayElements() // ['b', 'c']
   * faker.random.arrayElements(['cat', 'dog', 'mouse']) // ['mouse', 'cat']
   * faker.random.arrayElements([1, 2, 3, 4, 5], 2) // [4, 2]
   */
  arrayElements<T>(
    array: ReadonlyArray<T> = ['a', 'b', 'c'] as unknown as ReadonlyArray<T>,
    count?: number
  ): T[] {
    if (typeof count !== 'number') {
      count = this.faker.datatype.number({ min: 1, max: array.length });
    } else if (count > array.length) {
      count = array.length;
    } else if (count < 0) {
      count = 0;
    }

    const arrayCopy = array.slice(0);
    let i = array.length;
    const min = i - count;
    let temp: T;
    let index: number;

    while (i-- > min) {
      index = Math.floor(
        (i + 1) * this.faker.datatype.float({ min: 0, max: 0.99 })
      );
      temp = arrayCopy[index];
      arrayCopy[index] = arrayCopy[i];
      arrayCopy[i] = temp;
    }

    return arrayCopy.slice(min);
  }

  /**
   * Returns a random key or value from given object.
   *
   * @template T The type of `Record` to pick from.
   * @template K The keys of `T`.
   * @param object The object to get the keys or values from.
   * @param field If this is set to `'key'`, this method will a return a random key of the given instance.
   * If this is set to `'value'`, this method will a return a random value of the given instance.
   * Defaults to `'value'`.
   *
   * @example
   * const object = { keyA: 'valueA', keyB: 42 };
   * faker.random.objectElement(object) // 42
   * faker.random.objectElement(object, 'key') // 'keyB'
   * faker.random.objectElement(object, 'value') // 'valueA'
   */
  objectElement<T extends Record<string, unknown>, K extends keyof T>(
    object: T,
    field: 'key'
  ): K;
  objectElement<T extends Record<string, unknown>, K extends keyof T>(
    object: T,
    field?: unknown
  ): T[K];
  /**
   * Returns a random key or value from given object.
   *
   * @template T The type of `Record` to pick from.
   * @template K The keys of `T`.
   * @param object The object to get the keys or values from.
   * @param field If this is set to `'key'`, this method will a return a random key of the given instance.
   * If this is set to `'value'`, this method will a return a random value of the given instance.
   * Defaults to `'value'`.
   *
   * @example
   * const object = { keyA: 'valueA', keyB: 42 };
   * faker.random.objectElement(object) // 42
   * faker.random.objectElement(object, 'key') // 'keyB'
   * faker.random.objectElement(object, 'value') // 'valueA'
   */
  objectElement<T extends Record<string, unknown>, K extends keyof T>(
    object: T,
    field?: 'key' | 'value'
  ): K | T[K];
  objectElement<T extends Record<string, unknown>, K extends keyof T>(
    object = { foo: 'bar', too: 'car' } as unknown as T,
    field = 'value'
  ): K | T[K] {
    const array: Array<keyof T> = Object.keys(object);
    const key = this.faker.random.arrayElement(array);

    return field === 'key' ? (key as K) : (object[key] as T[K]);
  }

  /**
   * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
   *
   * @see faker.datatype.uuid()
   *
   * @example
   * faker.random.uuid() // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
   *
   * @deprecated
   */
  uuid(): string {
    console.warn(
      'Deprecation Warning: faker.random.uuid is now located in faker.datatype.uuid'
    );
    return this.faker.datatype.uuid();
  }

  /**
   * Returns the boolean value `true` or `false`.
   *
   * @see faker.datatype.boolean()
   *
   * @example
   * faker.random.boolean() // false
   *
   * @deprecated
   */
  boolean(): boolean {
    console.warn(
      'Deprecation Warning: faker.random.boolean is now located in faker.datatype.boolean'
    );
    return this.faker.datatype.boolean();
  }

  /**
   * Returns random word.
   *
   * @example
   * faker.random.word() // 'Seamless'
   */
  // TODO: have ability to return specific type of word? As in: noun, adjective, verb, etc
  word(): string {
    const wordMethods = [
      'commerce.department',
      'commerce.productName',
      'commerce.productAdjective',
      'commerce.productMaterial',
      'commerce.product',
      'commerce.color',

      'company.catchPhraseAdjective',
      'company.catchPhraseDescriptor',
      'company.catchPhraseNoun',
      'company.bsAdjective',
      'company.bsBuzz',
      'company.bsNoun',
      'address.streetSuffix',
      'address.county',
      'address.country',
      'address.state',

      'finance.accountName',
      'finance.transactionType',
      'finance.currencyName',

      'hacker.noun',
      'hacker.verb',
      'hacker.adjective',
      'hacker.ingverb',
      'hacker.abbreviation',

      'name.jobDescriptor',
      'name.jobArea',
      'name.jobType',
    ];

    // randomly pick from the many faker methods that can generate words
    const randomWordMethod = this.faker.random.arrayElement(wordMethods);
    const result = this.faker.fake('{{' + randomWordMethod + '}}');
    return this.faker.random.arrayElement(result.split(' '));
  }

  /**
   * Returns string with set of random words.
   *
   * @param count Number of words. Defaults to a random value between `1` and `3`.
   *
   * @example
   * faker.random.words() // 'neural'
   * faker.random.words(5) // 'copy Handcrafted bus client-server Point'
   */
  words(count?: number): string {
    const words: string[] = [];

    if (typeof count === 'undefined') {
      count = this.faker.datatype.number({ min: 1, max: 3 });
    }

    for (let i = 0; i < count; i++) {
      words.push(this.faker.random.word());
    }

    return words.join(' ');
  }

  /**
   * Returns a random image url.
   *
   * @see faker.random.image()
   *
   * @example
   * faker.random.image() // 'http://placeimg.com/640/480/animals'
   *
   * @deprecated
   */
  image(): string {
    console.warn(
      'Deprecation Warning: faker.random.image is now located in faker.image.image'
    );
    return this.faker.image.image();
  }

  /**
   * Returns a random locale, that is available in this faker instance.
   * You can use the returned locale with `faker.setLocale(result)`.
   *
   * @example
   * faker.random.locale() // 'el'
   */
  locale(): string {
    return this.faker.random.arrayElement(Object.keys(this.faker.locales));
  }

  /**
   * Generating a string consisting of lower/upper alpha characters based on count and upcase options.
   *
   * @param options Either the number of characters or an options instance. Defaults to `{ count: 1, upcase: false, bannedChars: [] }`.
   * @param options.count The number of characters to generate. Defaults to `1`.
   * @param options.upcase If true, the result will be uppercase. If false, it will be lowercase. Defaults to `false`.
   * @param options.bannedChars An array with characters to exclude. Defaults to `[]`.
   *
   * @example
   * faker.random.alpha() // 'b'
   * faker.random.alpha(10) // 'qccrabobaf'
   * faker.random.alpha({ count: 5, upcase: true, bannedChars: ['a'] }) // 'DTCIC'
   */
  // TODO @Shinigami92 2022-02-14: Tests covered `(count, options)`, but they were never typed like that
  alpha(
    options?:
      | number
      | { count?: number; upcase?: boolean; bannedChars?: string[] }
  ): string {
    if (typeof options === 'undefined') {
      options = {
        count: 1,
      };
    } else if (typeof options === 'number') {
      options = {
        count: options,
      };
    } else if (typeof options.count === 'undefined') {
      options.count = 1;
    }

    if (typeof options.upcase === 'undefined') {
      options.upcase = false;
    }
    if (typeof options.bannedChars === 'undefined') {
      options.bannedChars = [];
    }

    let wholeString = '';
    let charsArray = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    // TODO @Shinigami92 2022-01-11: A default empty array gets assigned above, we should check the length against 0 or not here
    if (options.bannedChars) {
      charsArray = arrayRemove(charsArray, options.bannedChars);
    }
    for (let i = 0; i < options.count; i++) {
      wholeString += this.faker.random.arrayElement(charsArray);
    }

    return options.upcase ? wholeString.toUpperCase() : wholeString;
  }

  /**
   * Generating a string consisting of lower/upper alpha characters and digits based on count and upcase options.
   *
   * @param count The number of characters and digits to generate. Defaults to `1`.
   * @param options The options to use. Defaults to `{ bannedChars: [] }`.
   * @param options.bannedChars An array of characters and digits which should be banned in the generated string. Defaults to `[]`.
   *
   * @example
   * faker.random.alphaNumeric() // '2'
   * faker.random.alphaNumeric(5) // '3e5v7'
   * faker.random.alphaNumeric(5, { bannedChars: ["a"] }) // 'xszlm'
   */
  alphaNumeric(
    count: number = 1,
    options: { bannedChars?: string[] } = {}
  ): string {
    if (typeof options.bannedChars === 'undefined') {
      options.bannedChars = [];
    }

    let wholeString = '';
    let charsArray = [
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
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];

    if (options.bannedChars) {
      charsArray = arrayRemove(charsArray, options.bannedChars);
    }

    if (charsArray.length === 0) {
      throw new Error(
        'Unable to generate string, because all possible characters are banned.'
      );
    }

    for (let i = 0; i < count; i++) {
      wholeString += this.faker.random.arrayElement(charsArray);
    }

    return wholeString;
  }

  /**
   * Returns a hexadecimal number.
   *
   * @param count Length of the generated number. Defaults to `1`.
   *
   * @see faker.datatype.hexaDecimal()
   *
   * @example
   * faker.datatype.hexaDecimal() // '0xb'
   * faker.datatype.hexaDecimal(10) // '0xaE13F044fb'
   *
   * @deprecated
   */
  hexaDecimal(count?: number): string {
    console.warn(
      'Deprecation Warning: faker.random.hexaDecimal is now located in faker.datatype.hexaDecimal'
    );
    return this.faker.datatype.hexaDecimal(count);
  }
}
