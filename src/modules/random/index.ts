import type { Faker } from '../..';
import { FakerError } from '../../errors/faker-error';
import { deprecated } from '../../internal/deprecated';
import type { LiteralUnion } from '../../utils/types';

export type Casing = 'upper' | 'lower' | 'mixed';

const UPPER_CHARS: readonly string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const LOWER_CHARS: readonly string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
const DIGIT_CHARS: readonly string[] = '0123456789'.split('');

export type LowerAlphaChar =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

export type UpperAlphaChar =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export type NumericChar =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9';

export type AlphaChar = LowerAlphaChar | UpperAlphaChar;
export type AlphaNumericChar = AlphaChar | NumericChar;

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
      this.faker.color.human,

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
      const randomWordMethod = this.faker.helpers.arrayElement(wordMethods);

      result = randomWordMethod();
    } while (!result || bannedChars.some((char) => result.includes(char)));

    return this.faker.helpers.arrayElement(result.split(' '));
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
    return this.faker.helpers.arrayElement(Object.keys(this.faker.locales));
  }

  /**
   * Generating a string consisting of letters in the English alphabet.
   *
   * @param options Either the number of characters or an options instance. Defaults to `{ count: 1, casing: 'lower', bannedChars: [] }`.
   * @param options.count The number of characters to generate. Defaults to `1`.
   * @param options.casing The casing of the characters. Defaults to `'lower'`.
   * @param options.upcase Deprecated, use `casing: 'upper'` instead.
   * @param options.bannedChars An array with characters to exclude. Defaults to `[]`.
   *
   * @example
   * faker.random.alpha() // 'b'
   * faker.random.alpha(10) // 'qccrabobaf'
   * faker.random.alpha({ count: 5, casing: 'upper', bannedChars: ['A'] }) // 'DTCIC'
   */
  alpha(
    options:
      | number
      | {
          count?: number;
          /**
           * @deprecated Use `casing` instead.
           */
          upcase?: boolean;
          casing?: Casing;
          bannedChars?: readonly LiteralUnion<AlphaChar>[] | string;
        } = {}
  ): string {
    if (typeof options === 'number') {
      options = {
        count: options,
      };
    }

    const { count = 1, upcase } = options;
    let { bannedChars = [] } = options;

    if (typeof bannedChars === 'string') {
      bannedChars = bannedChars.split('');
    }

    if (count <= 0) {
      return '';
    }

    const {
      // Switch to 'mixed' with v8.0
      casing = upcase ? 'upper' : 'lower',
    } = options;

    if (upcase != null) {
      deprecated({
        deprecated: 'faker.random.alpha({ upcase: true })',
        proposed: "faker.random.alpha({ casing: 'upper' })",
        since: '7.0',
        until: '8.0',
      });
    }

    let charsArray: string[];
    switch (casing) {
      case 'upper':
        charsArray = [...UPPER_CHARS];
        break;
      case 'lower':
        charsArray = [...LOWER_CHARS];
        break;
      case 'mixed':
      default:
        charsArray = [...LOWER_CHARS, ...UPPER_CHARS];
        break;
    }

    charsArray = arrayRemove(charsArray, bannedChars);

    if (charsArray.length === 0) {
      throw new FakerError(
        'Unable to generate string, because all possible characters are banned.'
      );
    }

    return Array.from({ length: count }, () =>
      this.faker.helpers.arrayElement(charsArray)
    ).join('');
  }

  /**
   * Generating a string consisting of alpha characters and digits.
   *
   * @param count The number of characters and digits to generate. Defaults to `1`.
   * @param options The options to use. Defaults to `{ bannedChars: [] }`.
   * @param options.casing The casing of the characters. Defaults to `'lower'`.
   * @param options.bannedChars An array of characters and digits which should be banned in the generated string. Defaults to `[]`.
   *
   * @example
   * faker.random.alphaNumeric() // '2'
   * faker.random.alphaNumeric(5) // '3e5v7'
   * faker.random.alphaNumeric(5, { bannedChars: ["a"] }) // 'xszlm'
   */
  alphaNumeric(
    count: number = 1,
    options: {
      casing?: Casing;
      bannedChars?: readonly LiteralUnion<AlphaNumericChar>[] | string;
    } = {}
  ): string {
    if (count <= 0) {
      return '';
    }

    const {
      // Switch to 'mixed' with v8.0
      casing = 'lower',
    } = options;
    let { bannedChars = [] } = options;

    if (typeof bannedChars === 'string') {
      bannedChars = bannedChars.split('');
    }

    let charsArray = [...DIGIT_CHARS];

    switch (casing) {
      case 'upper':
        charsArray.push(...UPPER_CHARS);
        break;
      case 'lower':
        charsArray.push(...LOWER_CHARS);
        break;
      case 'mixed':
      default:
        charsArray.push(...LOWER_CHARS, ...UPPER_CHARS);
        break;
    }

    charsArray = arrayRemove(charsArray, bannedChars);

    if (charsArray.length === 0) {
      throw new FakerError(
        'Unable to generate string, because all possible characters are banned.'
      );
    }

    return Array.from({ length: count }, () =>
      this.faker.helpers.arrayElement(charsArray)
    ).join('');
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
      bannedDigits?: readonly LiteralUnion<NumericChar>[] | string;
    } = {}
  ): string {
    if (length <= 0) {
      return '';
    }

    const { allowLeadingZeros = false } = options;
    let { bannedDigits = [] } = options;

    if (typeof bannedDigits === 'string') {
      bannedDigits = bannedDigits.split('');
    }

    const allowedDigits = DIGIT_CHARS.filter(
      (digit) => !bannedDigits.includes(digit)
    );

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
      result += this.faker.helpers.arrayElement(
        allowedDigits.filter((digit) => digit !== '0')
      );
    }

    while (result.length < length) {
      result += this.faker.helpers.arrayElement(allowedDigits);
    }

    return result;
  }
}
