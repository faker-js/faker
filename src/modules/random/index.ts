import type { Faker } from '../..';
import { FakerError } from '../../errors/faker-error';

/**
 * Method to reduce array of characters.
 *
 * @param arr existing array of characters
 * @param values array of characters which should be removed
 * @returns new array without banned characters
 */
function arrayRemove<T>(arr: T[], values: readonly T[]): T[] {
  values.forEach((value) => {
    arr = arr.filter((ele) => ele !== value);
  });
  return arr;
}

/**
 * Generates random values of different kinds.
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
   * Returns random word.
   *
   * @example
   * faker.random.word() // 'Seamless'
   */
  word(): string {
    const wordMethods = [
      this.faker.commerce.department,
      this.faker.commerce.productName,
      this.faker.commerce.productAdjective,
      this.faker.commerce.productMaterial,
      this.faker.commerce.product,
      this.faker.commerce.color,

      this.faker.company.catchPhraseAdjective,
      this.faker.company.catchPhraseDescriptor,
      this.faker.company.catchPhraseNoun,
      this.faker.company.bsAdjective,
      this.faker.company.bsBuzz,
      this.faker.company.bsNoun,
      this.faker.address.streetSuffix,
      this.faker.address.county,
      this.faker.address.country,
      this.faker.address.state,

      this.faker.finance.accountName,
      this.faker.finance.transactionType,
      this.faker.finance.currencyName,

      this.faker.hacker.noun,
      this.faker.hacker.verb,
      this.faker.hacker.adjective,
      this.faker.hacker.ingverb,
      this.faker.hacker.abbreviation,

      this.faker.name.jobDescriptor,
      this.faker.name.jobArea,
      this.faker.name.jobType,
    ];

    const bannedChars = [
      '!',
      '#',
      '%',
      '&',
      '*',
      ')',
      '(',
      '+',
      '=',
      '.',
      '<',
      '>',
      '{',
      '}',
      '[',
      ']',
      ':',
      ';',
      "'",
      '"',
      '_',
      '-',
    ];
    let result: string;

    do {
      // randomly pick from the many faker methods that can generate words
      const randomWordMethod = this.faker.helper.arrayElement(wordMethods);

      result = randomWordMethod();
    } while (!result || bannedChars.some((char) => result.includes(char)));

    return this.faker.helper.arrayElement(result.split(' '));
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

    if (count == null) {
      count = this.faker.datatype.number({ min: 1, max: 3 });
    }

    for (let i = 0; i < count; i++) {
      words.push(this.word());
    }

    return words.join(' ');
  }

  /**
   * Returns a random locale, that is available in this faker instance.
   * You can use the returned locale with `faker.setLocale(result)`.
   *
   * @example
   * faker.random.locale() // 'el'
   */
  locale(): string {
    return this.faker.helper.arrayElement(Object.keys(this.faker.locales));
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
    options:
      | number
      | {
          count?: number;
          upcase?: boolean;
          bannedChars?: readonly string[];
        } = {}
  ): string {
    if (typeof options === 'number') {
      options = {
        count: options,
      };
    }
    const { count = 1, upcase = false, bannedChars = [] } = options;

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

    charsArray = arrayRemove(charsArray, bannedChars);

    let wholeString = '';
    for (let i = 0; i < count; i++) {
      wholeString += this.faker.helper.arrayElement(charsArray);
    }

    return upcase ? wholeString.toUpperCase() : wholeString;
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
    options: { bannedChars?: readonly string[] } = {}
  ): string {
    const { bannedChars = [] } = options;

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

    charsArray = arrayRemove(charsArray, bannedChars);

    if (charsArray.length === 0) {
      throw new FakerError(
        'Unable to generate string, because all possible characters are banned.'
      );
    }

    let wholeString = '';
    for (let i = 0; i < count; i++) {
      wholeString += this.faker.helper.arrayElement(charsArray);
    }

    return wholeString;
  }

  /**
   * Generates a given length string of digits.
   *
   * @param length The number of digits to generate. Defaults to `1`.
   * @param options The options to use. Defaults to `{}`.
   * @param options.allowLeadingZeros If true, leading zeros will be allowed. Defaults to `false`.
   * @param options.bannedDigits An array of digits which should be banned in the generated string. Defaults to `[]`.
   *
   * @example
   * faker.random.numeric() // '2'
   * faker.random.numeric(5) // '31507'
   * faker.random.numeric(42) // '56434563150765416546479875435481513188548'
   * faker.random.numeric(42, { allowLeadingZeros: true }) // '00564846278453876543517840713421451546115'
   * faker.random.numeric(6, { bannedDigits: ['0'] }) // '943228'
   */
  numeric(
    length: number = 1,
    options: {
      allowLeadingZeros?: boolean;
      bannedDigits?: readonly string[];
    } = {}
  ): string {
    if (length <= 0) {
      return '';
    }

    const { allowLeadingZeros = false, bannedDigits = [] } = options;

    const allowedDigits = '0123456789'
      .split('')
      .filter((digit) => !bannedDigits.includes(digit));

    if (
      allowedDigits.length === 0 ||
      (allowedDigits.length === 1 &&
        !allowLeadingZeros &&
        allowedDigits[0] === '0')
    ) {
      throw new FakerError(
        'Unable to generate numeric string, because all possible digits are banned.'
      );
    }

    let result = '';

    if (!allowLeadingZeros && !bannedDigits.includes('0')) {
      result += this.faker.helper.arrayElement(
        allowedDigits.filter((digit) => digit !== '0')
      );
    }

    while (result.length < length) {
      result += this.faker.helper.arrayElement(allowedDigits);
    }

    return result;
  }
}
