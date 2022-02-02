import type { Faker } from '.';

/**
 * Method to reduce array of characters.
 *
 * @param arr existing array of characters
 * @param values array of characters which should be removed
 * @return new array without banned characters
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
  constructor(private readonly faker: Faker, seed?: any[] | any) {
    // Use a user provided seed if it is an array or number
    if (Array.isArray(seed) && seed.length) {
      this.faker.mersenne.seed_array(seed);
    } else if (!isNaN(seed)) {
      this.faker.mersenne.seed(seed);
    }

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
   * @example
   * faker.random.number() // 55422
   * faker.random.number(100) // 52
   * faker.random.number({ min: 1000000 }) // 431433
   * faker.random.number({ max: 100 }) // 42
   * faker.random.number({ precision: 0.01 }) // 64246.18
   * faker.random.number({ min: 10, max: 100, precision: 0.01 }) // 36.94
   *
   * @deprecated
   * @see faker.datatype.number()
   */
  number(
    options?: number | { min?: number; max?: number; precision?: number }
  ): number {
    console.log(
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
   * @example
   * faker.random.float() // 51696.36
   * faker.random.float(0.1) // 52023.2
   * faker.random.float({ min: 1000000 }) // 212859.76
   * faker.random.float({ max: 100 }) // 28.11
   * faker.random.float({ precision: 0.1 }) // 84055.3
   * faker.random.float({ min: 10, max: 100, precision: 0.001 }) // 57.315
   *
   * @deprecated
   * @see faker.datatype.float()
   */
  float(
    options?: number | { min?: number; max?: number; precision?: number }
  ): number {
    console.log(
      'Deprecation Warning: faker.random.float is now located in faker.datatype.float'
    );
    return this.faker.datatype.float(options);
  }

  /**
   * Returns random element from the given array.
   *
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

  // TODO @Shinigami92 2022-01-28: This function needs types
  /**
   * Returns a random random key or value from given object.
   *
   * @method faker.random.objectElement
   * @param object
   * @param field
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  objectElement(object: any = { foo: 'bar', too: 'car' }, field?: string) {
    const array = Object.keys(object);
    const key = this.faker.random.arrayElement(array);

    return field === 'key' ? key : object[key];
  }

  /**
   * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
   *
   * @example
   * faker.random.uuid() // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
   *
   * @deprecated
   * @see faker.datatype.uuid()
   */
  uuid(): string {
    console.log(
      'Deprecation Warning: faker.random.uuid is now located in faker.datatype.uuid'
    );
    return this.faker.datatype.uuid();
  }

  /**
   * Returns the boolean value true or false.
   *
   * @example
   * faker.random.boolean() // false
   *
   * @deprecated
   * @see faker.datatype.boolean()
   */
  boolean(): boolean {
    console.log(
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
   * @see word()
   */
  readonly randomWord: Random['word'] = this.word.bind(this);

  /**
   * Returns string with set of random words.
   *
   * @param count Number of words. Defaults to a random value between `1` and `3`
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
   * @see words()
   */
  readonly randomWords: Random['words'] = this.words.bind(this);

  /**
   * locale
   *
   * @method faker.random.image
   * @deprecated
   */
  image(): string {
    console.log(
      'Deprecation Warning: faker.random.image is now located in faker.image.image'
    );
    return this.faker.image.image();
  }

  readonly randomImage: Random['image'] = this.image.bind(this);

  /**
   * locale
   *
   * @method faker.random.locale
   */
  locale(): string {
    return this.faker.random.arrayElement(Object.keys(this.faker.locales));
  }

  readonly randomLocale: Random['locale'] = this.locale.bind(this);

  /**
   * alpha. returns lower/upper alpha characters based count and upcase options
   *
   * @method faker.random.alpha
   * @param options // defaults to { count: 1, upcase: false, bannedChars: [] }
   */
  alpha(
    options?:
      | number
      | { count: number; upcase?: boolean; bannedChars?: string[] }
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
   * alphaNumeric
   *
   * @method faker.random.alphaNumeric
   * @param count defaults to 1
   * @param options // defaults to { bannedChars: [] }
   * @param options.bannedChars array of characters which should be banned in new string
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
    if (options) {
      if (options.bannedChars) {
        charsArray = arrayRemove(charsArray, options.bannedChars);
      }
    }
    for (let i = 0; i < count; i++) {
      wholeString += this.faker.random.arrayElement(charsArray);
    }

    return wholeString;
  }

  /**
   * hexaDecimal
   *
   * @method faker.random.hexaDecimal
   * @param count defaults to 1
   * @deprecated
   */
  hexaDecimal(count?: number): string {
    console.log(
      'Deprecation Warning: faker.random.hexaDecimal is now located in faker.datatype.hexaDecimal'
    );
    return this.faker.datatype.hexaDecimal(count);
  }
}
