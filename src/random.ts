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
   * Returns a single random number based on a max number or range.
   *
   * @method faker.random.number
   * @param options {min, max, precision}
   *
   * @deprecated
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
   * Returns a single random floating-point number based on a max number or range.
   *
   * @method faker.random.float
   * @param options
   *
   * @deprecated
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
   * Takes an array and returns a random element of the array.
   *
   * @method faker.random.arrayElement
   * @param array
   */
  arrayElement<T = string>(
    array: ReadonlyArray<T> = ['a', 'b', 'c'] as unknown as ReadonlyArray<T>
  ): T {
    const r = this.faker.datatype.number({ max: array.length - 1 });
    return array[r];
  }

  /**
   * Takes an array and returns a subset with random elements of the array.
   *
   * @method faker.random.arrayElements
   * @param array
   * @param count number of elements to pick
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
   * Takes an object and returns a random key or value.
   *
   * @method faker.random.objectElement
   * @param object
   * @param field
   */
  objectElement<T extends Record<string, unknown>, K extends keyof T>(
    object: T,
    field: 'key'
  ): K;
  objectElement<T extends Record<string, unknown>, K extends keyof T>(
    object: T,
    field?: unknown
  ): T[K];
  objectElement<T extends Record<string, unknown>, K extends keyof T>(
    object = { foo: 'bar', too: 'car' } as unknown as T,
    field = 'value'
  ): K | T[K] {
    const array: Array<keyof T> = Object.keys(object);
    const key = this.faker.random.arrayElement(array);

    return field === 'key' ? (key as K) : (object[key] as T[K]);
  }

  /**
   * uuid
   *
   * @method faker.random.uuid
   * @deprecated
   */
  uuid(): string {
    console.log(
      'Deprecation Warning: faker.random.uuid is now located in faker.datatype.uuid'
    );
    return this.faker.datatype.uuid();
  }

  /**
   * boolean
   *
   * @method faker.random.boolean
   * @deprecated
   */
  boolean(): boolean {
    console.log(
      'Deprecation Warning: faker.random.boolean is now located in faker.datatype.boolean'
    );
    return this.faker.datatype.boolean();
  }

  // TODO: have ability to return specific type of word? As in: noun, adjective, verb, etc
  /**
   * word
   *
   * @method faker.random.word
   * @param type
   */
  // TODO @Shinigami92 2022-01-11: `type` is not in use
  word(type?: unknown): string {
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

  readonly randomWord: Random['word'] = this.word.bind(this);

  /**
   * randomWords
   *
   * @method faker.random.words
   * @param count defaults to a random value between 1 and 3
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
