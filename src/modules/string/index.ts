import type { Faker } from '../..';
import { FakerError } from '../../errors/faker-error';
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
 * Module to generate string related entries.
 */
export class StringModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(StringModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a string containing UTF-16 chars between 33 and 125 (`!` to `}`).
   *
   * @param length Length of the generated string. Max length is `2^20`. Defaults to `10`.
   *
   * @example
   * faker.string.random() // 'Zo!.:*e>wR'
   * faker.string.random(5) // '6Bye8'
   */
  random(length = 10): string {
    const maxLength = Math.pow(2, 20);
    if (length >= maxLength) {
      length = maxLength;
    }

    const charCodeOption = {
      min: 33,
      max: 125,
    };

    let returnString = '';

    while (returnString.length < length) {
      returnString += String.fromCharCode(
        this.faker.datatype.number(charCodeOption)
      );
    }

    return returnString;
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
   * faker.string.alpha() // 'b'
   * faker.string.alpha(10) // 'qccrabobaf'
   * faker.string.alpha({ count: 5, casing: 'upper', bannedChars: ['A'] }) // 'DTCIC'
   */
  alpha(
    options:
      | number
      | {
          count?: number;
          casing?: Casing;
          bannedChars?: readonly LiteralUnion<AlphaChar>[] | string;
        } = {}
  ): string {
    if (typeof options === 'number') {
      options = {
        count: options,
      };
    }

    const { count = 1, casing = 'mixed' } = options;
    let { bannedChars = [] } = options;

    if (typeof bannedChars === 'string') {
      bannedChars = bannedChars.split('');
    }

    if (count <= 0) {
      return '';
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

    charsArray = charsArray.filter((elem) => !bannedChars.includes(elem));

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
   * @param options Either the number of characters or an options instance. Defaults to `{ count: 1, casing: 'mixed', bannedChars: [] }`.
   * @param options.count The number of characters and digits to generate. Defaults to `1`.
   * @param options.casing The casing of the characters. Defaults to `'mixed'`.
   * @param options.bannedChars An array of characters and digits which should be banned in the generated string. Defaults to `[]`.
   *
   * @example
   * faker.string.alphaNumeric() // '2'
   * faker.string.alphaNumeric(5) // '3e5v7'
   * faker.string.alphaNumeric(5, { bannedChars: ["a"] }) // 'xszlm'
   */
  alphaNumeric(
    options:
      | number
      | {
          count?: number;
          casing?: Casing;
          bannedChars?: readonly LiteralUnion<AlphaNumericChar>[] | string;
        } = {}
  ): string {
    if (typeof options === 'number') {
      options = {
        count: options,
      };
    }

    const { casing = 'mixed', count = 1 } = options;

    if (count <= 0) {
      return '';
    }

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

    charsArray = charsArray.filter((elem) => !bannedChars.includes(elem));

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
   * @param options Either the number of characters or the options to use. Defaults to `{ length: 1, allowLeadingZeros = false, bannedDigits = [] }`.
   * @param options.length The number of digits to generate. Defaults to `1`.
   * @param options.allowLeadingZeros If true, leading zeros will be allowed. Defaults to `false`.
   * @param options.bannedDigits An array of digits which should be banned in the generated string. Defaults to `[]`.
   *
   * @example
   * faker.string.numeric() // '2'
   * faker.string.numeric(5) // '31507'
   * faker.string.numeric(42) // '56434563150765416546479875435481513188548'
   * faker.string.numeric({ allowLeadingZeros: true, length: 42 }) // '00564846278453876543517840713421451546115'
   * faker.string.numeric({ bannedDigits: ['0'], length: 6 }) // '943228'
   */
  numeric(
    options:
      | number
      | {
          length?: number;
          allowLeadingZeros?: boolean;
          bannedDigits?: readonly LiteralUnion<NumericChar>[] | string;
        } = {}
  ): string {
    if (typeof options === 'number') {
      options = {
        length: options,
      };
    }

    const { allowLeadingZeros = false, length = 1 } = options;
    if (length <= 0) {
      return '';
    }

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

  /**
   * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
   *
   * @example
   * faker.string.uuid() // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
   */
  uuid(): string {
    const RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    const replacePlaceholders = (placeholder: string) => {
      const random = this.faker.datatype.number({ min: 0, max: 15 });
      const value = placeholder === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    };
    return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
  }

  /**
   * Returns a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) string.
   *
   * @param length Length of the generated string. Defaults to `1`.
   *
   * @example
   * faker.string.hexadecimal() // 'b'
   * faker.string.hexadecimal(10) // 'aE13F044fb'
   */
  hexadecimal(length = 1): string {
    let wholeString = '';

    while (wholeString.length < length) {
      wholeString += this.faker.helpers.arrayElement([
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

    return wholeString;
  }
}
