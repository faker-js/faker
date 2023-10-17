import type { Faker, SimpleFaker } from '../..';
import { FakerError } from '../../errors/faker-error';
import { bindThisToMemberFunctions } from '../../internal/bind-this-to-member-functions';
import { deprecated } from '../../internal/deprecated';
import { luhnCheckValue } from './luhn-check';
import type { RecordKey } from './unique';
import * as uniqueExec from './unique';

/**
 * Returns a number based on given RegEx-based quantifier symbol or quantifier values.
 *
 * @param faker Faker instance
 * @param quantifierSymbol Quantifier symbols can be either of these: `?`, `*`, `+`.
 * @param quantifierMin Quantifier minimum value. If given without a maximum, this will be used as the quantifier value.
 * @param quantifierMax Quantifier maximum value. Will randomly get a value between the minimum and maximum if both are provided.
 *
 * @returns a random number based on the given quantifier parameters.
 *
 * @example
 * getRepetitionsBasedOnQuantifierParameters(this.faker, '*', null, null) // 3
 * getRepetitionsBasedOnQuantifierParameters(this.faker, null, 10, null) // 10
 * getRepetitionsBasedOnQuantifierParameters(this.faker, null, 5, 8) // 6
 *
 * @since 8.0.0
 */
function getRepetitionsBasedOnQuantifierParameters(
  faker: SimpleFaker,
  quantifierSymbol: string,
  quantifierMin: string,
  quantifierMax: string
) {
  let repetitions = 1;
  if (quantifierSymbol) {
    switch (quantifierSymbol) {
      case '?': {
        repetitions = faker.datatype.boolean() ? 0 : 1;
        break;
      }

      case '*': {
        let limit = 1;
        while (faker.datatype.boolean()) {
          limit *= 2;
        }

        repetitions = faker.number.int({ min: 0, max: limit });
        break;
      }

      case '+': {
        let limit = 1;
        while (faker.datatype.boolean()) {
          limit *= 2;
        }

        repetitions = faker.number.int({ min: 1, max: limit });
        break;
      }

      default:
        throw new FakerError('Unknown quantifier symbol provided.');
    }
  } else if (quantifierMin != null && quantifierMax != null) {
    repetitions = faker.number.int({
      min: parseInt(quantifierMin),
      max: parseInt(quantifierMax),
    });
  } else if (quantifierMin != null && quantifierMax == null) {
    repetitions = parseInt(quantifierMin);
  }

  return repetitions;
}

/**
 * Replaces the regex like expressions in the given string with matching values. Note: This method will be removed in v9.
 *
 * Supported patterns:
 * - `.{times}` => Repeat the character exactly `times` times.
 * - `.{min,max}` => Repeat the character `min` to `max` times.
 * - `[min-max]` => Generate a number between min and max (inclusive).
 *
 * @internal
 *
 * @param faker A Faker instance.
 * @param string The template string to parse.
 *
 * @example
 * faker.helpers.legacyRegexpStringParse() // ''
 * faker.helpers.legacyRegexpStringParse('#{5}') // '#####'
 * faker.helpers.legacyRegexpStringParse('#{2,9}') // '#######'
 * faker.helpers.legacyRegexpStringParse('[500-15000]') // '8375'
 * faker.helpers.legacyRegexpStringParse('#{3}test[1-5]') // '###test3'
 *
 * @since 5.0.0
 */
function legacyRegexpStringParse(
  faker: SimpleFaker,
  string: string = ''
): string {
  // Deal with range repeat `{min,max}`
  const RANGE_REP_REG = /(.)\{(\d+),(\d+)\}/;
  const REP_REG = /(.)\{(\d+)\}/;
  const RANGE_REG = /\[(\d+)-(\d+)\]/;
  let min: number;
  let max: number;
  let tmp: number;
  let repetitions: number;
  let token = RANGE_REP_REG.exec(string);
  while (token != null) {
    min = parseInt(token[2]);
    max = parseInt(token[3]);
    // switch min and max
    if (min > max) {
      tmp = max;
      max = min;
      min = tmp;
    }

    repetitions = faker.number.int({ min, max });
    string =
      string.slice(0, token.index) +
      token[1].repeat(repetitions) +
      string.slice(token.index + token[0].length);
    token = RANGE_REP_REG.exec(string);
  }

  // Deal with repeat `{num}`
  token = REP_REG.exec(string);
  while (token != null) {
    repetitions = parseInt(token[2]);
    string =
      string.slice(0, token.index) +
      token[1].repeat(repetitions) +
      string.slice(token.index + token[0].length);
    token = REP_REG.exec(string);
  }
  // Deal with range `[min-max]` (only works with numbers for now)

  token = RANGE_REG.exec(string);
  while (token != null) {
    min = parseInt(token[1]); // This time we are not capturing the char before `[]`
    max = parseInt(token[2]);
    // switch min and max
    if (min > max) {
      tmp = max;
      max = min;
      min = tmp;
    }

    string =
      string.slice(0, token.index) +
      faker.number.int({ min, max }).toString() +
      string.slice(token.index + token[0].length);
    token = RANGE_REG.exec(string);
  }

  return string;
}

/**
 * Module with various helper methods providing basic (seed-dependent) operations useful for implementing faker methods (without methods requiring localized data).
 */
export class SimpleHelpersModule {
  /**
   * Global store of unique values.
   * This means that faker should *never* return duplicate values across all API methods when using `faker.helpers.unique` without passing `options.store`.
   *
   * @internal
   */
  private readonly uniqueStore: Record<RecordKey, RecordKey> = {};

  constructor(protected readonly faker: SimpleFaker) {
    bindThisToMemberFunctions(this);
  }

  /**
   * Slugifies the given string.
   * For that all spaces (` `) are replaced by hyphens (`-`)
   * and most non word characters except for dots and hyphens will be removed.
   *
   * @param string The input to slugify.
   *
   * @example
   * faker.helpers.slugify() // ''
   * faker.helpers.slugify("Hello world!") // 'Hello-world'
   *
   * @since 2.0.1
   */
  slugify(string: string = ''): string {
    return string
      .normalize('NFKD') //for example è decomposes to as e +  ̀
      .replace(/[\u0300-\u036f]/g, '') // removes combining marks
      .replace(/ /g, '-') // replaces spaces with hyphens
      .replace(/[^\w.-]+/g, ''); // removes all non-word characters except for dots and hyphens
  }

  /**
   * Parses the given string symbol by symbol and replaces the placeholders with digits (`0` - `9`).
   * `!` will be replaced by digits >=2 (`2` - `9`).
   *
   * @param string The template string to parse.
   * @param symbol The symbol to replace with digits. Defaults to `'#'`.
   *
   * @example
   * faker.helpers.replaceSymbolWithNumber() // ''
   * faker.helpers.replaceSymbolWithNumber('#####') // '04812'
   * faker.helpers.replaceSymbolWithNumber('!####') // '27378'
   * faker.helpers.replaceSymbolWithNumber('Your pin is: !####') // '29841'
   *
   * @since 2.0.1
   */
  replaceSymbolWithNumber(string: string = '', symbol: string = '#'): string {
    let str = '';
    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) === symbol) {
        str += this.faker.number.int(9);
      } else if (string.charAt(i) === '!') {
        str += this.faker.number.int({ min: 2, max: 9 });
      } else {
        str += string.charAt(i);
      }
    }

    return str;
  }

  /**
   * Parses the given string symbol by symbols and replaces the placeholder appropriately.
   *
   * - `#` will be replaced with a digit (`0` - `9`).
   * - `?` will be replaced with an upper letter ('A' - 'Z')
   * - and `*` will be replaced with either a digit or letter.
   *
   * @param string The template string to parse.
   *
   * @example
   * faker.helpers.replaceSymbols() // ''
   * faker.helpers.replaceSymbols('#####') // '98441'
   * faker.helpers.replaceSymbols('?????') // 'ZYRQQ'
   * faker.helpers.replaceSymbols('*****') // '4Z3P7'
   * faker.helpers.replaceSymbols('Your pin is: #?*#?*') // '0T85L1'
   *
   * @since 3.0.0
   */
  replaceSymbols(string: string = ''): string {
    const alpha = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    let str = '';

    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) === '#') {
        str += this.faker.number.int(9);
      } else if (string.charAt(i) === '?') {
        str += this.arrayElement(alpha);
      } else if (string.charAt(i) === '*') {
        str += this.faker.datatype.boolean()
          ? this.arrayElement(alpha)
          : this.faker.number.int(9);
      } else {
        str += string.charAt(i);
      }
    }

    return str;
  }

  /**
   * Replaces the symbols and patterns in a credit card schema including Luhn checksum.
   *
   * This method supports both range patterns `[4-9]` as well as the patterns used by `replaceSymbolWithNumber()`.
   * `L` will be replaced with the appropriate Luhn checksum.
   *
   * @param string The credit card format pattern. Defaults to `6453-####-####-####-###L`.
   * @param symbol The symbol to replace with a digit.
   *
   * @example
   * faker.helpers.replaceCreditCardSymbols() // '6453-4876-8626-8995-3771'
   * faker.helpers.replaceCreditCardSymbols('1234-[4-9]-##!!-L') // '1234-9-5298-2'
   *
   * @since 5.0.0
   */
  replaceCreditCardSymbols(
    string: string = '6453-####-####-####-###L',
    symbol: string = '#'
  ): string {
    // default values required for calling method without arguments

    string = legacyRegexpStringParse(this.faker, string); // replace [4-9] with a random number in range etc...
    string = this.replaceSymbolWithNumber(string, symbol); // replace ### with random numbers

    const checkNum = luhnCheckValue(string);
    return string.replace('L', String(checkNum));
  }

  /**
   * Replaces the regex like expressions in the given string with matching values.
   *
   * Supported patterns:
   * - `.{times}` => Repeat the character exactly `times` times.
   * - `.{min,max}` => Repeat the character `min` to `max` times.
   * - `[min-max]` => Generate a number between min and max (inclusive).
   *
   * @param string The template string to parse.
   *
   * @see faker.helpers.fromRegExp()
   *
   * @example
   * faker.helpers.regexpStyleStringParse() // ''
   * faker.helpers.regexpStyleStringParse('#{5}') // '#####'
   * faker.helpers.regexpStyleStringParse('#{2,9}') // '#######'
   * faker.helpers.regexpStyleStringParse('[500-15000]') // '8375'
   * faker.helpers.regexpStyleStringParse('#{3}test[1-5]') // '###test3'
   *
   * @since 5.0.0
   *
   * @deprecated Use `faker.helpers.fromRegExp()` instead.
   */
  regexpStyleStringParse(string: string = ''): string {
    deprecated({
      deprecated: 'faker.helpers.regexpStyleStringParse',
      proposed: 'faker.helpers.fromRegExp',
      since: '8.1',
      until: '9.0',
    });

    return legacyRegexpStringParse(this.faker, string);
  }

  /**
   * Generates a string matching the given regex like expressions.
   *
   * This function doesn't provide full support of actual `RegExp`.
   * Features such as grouping, anchors and character classes are not supported.
   * If you are looking for a library that randomly generates strings based on
   * `RegExp`s, see [randexp.js](https://github.com/fent/randexp.js)
   *
   * Supported patterns:
   * - `x{times}` => Repeat the `x` exactly `times` times.
   * - `x{min,max}` => Repeat the `x` `min` to `max` times.
   * - `[x-y]` => Randomly get a character between `x` and `y` (inclusive).
   * - `[x-y]{times}` => Randomly get a character between `x` and `y` (inclusive) and repeat it `times` times.
   * - `[x-y]{min,max}` => Randomly get a character between `x` and `y` (inclusive) and repeat it `min` to `max` times.
   * - `[^...]` => Randomly get an ASCII number or letter character that is not in the given range. (e.g. `[^0-9]` will get a random non-numeric character).
   * - `[-...]` => Include dashes in the range. Must be placed after the negate character `^` and before any character sets if used (e.g. `[^-0-9]` will not get any numeric characters or dashes).
   * - `/[x-y]/i` => Randomly gets an uppercase or lowercase character between `x` and `y` (inclusive).
   * - `x?` => Randomly decide to include or not include `x`.
   * - `[x-y]?` => Randomly decide to include or not include characters between `x` and `y` (inclusive).
   * - `x*` => Repeat `x` 0 or more times.
   * - `[x-y]*` => Repeat characters between `x` and `y` (inclusive) 0 or more times.
   * - `x+` => Repeat `x` 1 or more times.
   * - `[x-y]+` => Repeat characters between `x` and `y` (inclusive) 1 or more times.
   * - `.` => returns a wildcard ASCII character that can be any number, character or symbol. Can be combined with quantifiers as well.
   *
   * @param pattern The template string/RegExp to generate a matching string for.
   *
   * @throws If min value is more than max value in quantifier. e.g. `#{10,5}`
   * @throws If invalid quantifier symbol is passed in.
   *
   * @example
   * faker.helpers.fromRegExp('#{5}') // '#####'
   * faker.helpers.fromRegExp('#{2,9}') // '#######'
   * faker.helpers.fromRegExp('[1-7]') // '5'
   * faker.helpers.fromRegExp('#{3}test[1-5]') // '###test3'
   * faker.helpers.fromRegExp('[0-9a-dmno]') // '5'
   * faker.helpers.fromRegExp('[^a-zA-Z0-8]') // '9'
   * faker.helpers.fromRegExp('[a-d0-6]{2,8}') // 'a0dc45b0'
   * faker.helpers.fromRegExp('[-a-z]{5}') // 'a-zab'
   * faker.helpers.fromRegExp(/[A-Z0-9]{4}-[A-Z0-9]{4}/) // 'BS4G-485H'
   * faker.helpers.fromRegExp(/[A-Z]{5}/i) // 'pDKfh'
   * faker.helpers.fromRegExp(/.{5}/) // '14(#B'
   * faker.helpers.fromRegExp(/Joh?n/) // 'Jon'
   * faker.helpers.fromRegExp(/ABC*DE/) // 'ABDE'
   * faker.helpers.fromRegExp(/bee+p/) // 'beeeeeeeep'
   *
   * @since 8.0.0
   */
  fromRegExp(pattern: string | RegExp): string {
    let isCaseInsensitive = false;

    if (pattern instanceof RegExp) {
      isCaseInsensitive = pattern.flags.includes('i');
      pattern = pattern.toString();
      pattern = /\/(.+?)\//.exec(pattern)?.[1] ?? ''; // Remove frontslash from front and back of RegExp
    }

    let min: number;
    let max: number;
    let repetitions: number;

    // Deal with single wildcards
    const SINGLE_CHAR_REG =
      /([.A-Za-z0-9])(?:\{(\d+)(?:,(\d+)|)\}|(\?|\*|\+))(?![^[]*]|[^{]*})/;
    let token = SINGLE_CHAR_REG.exec(pattern);
    while (token != null) {
      const quantifierMin: string = token[2];
      const quantifierMax: string = token[3];
      const quantifierSymbol: string = token[4];

      repetitions = getRepetitionsBasedOnQuantifierParameters(
        this.faker,
        quantifierSymbol,
        quantifierMin,
        quantifierMax
      );

      pattern =
        pattern.slice(0, token.index) +
        token[1].repeat(repetitions) +
        pattern.slice(token.index + token[0].length);
      token = SINGLE_CHAR_REG.exec(pattern);
    }

    const SINGLE_RANGE_REG = /(\d-\d|\w-\w|\d|\w|[-!@#$&()`.+,/"])/;
    const RANGE_ALPHANUMEMRIC_REG =
      /\[(\^|)(-|)(.+?)\](?:\{(\d+)(?:,(\d+)|)\}|(\?|\*|\+)|)/;
    // Deal with character classes with quantifiers `[a-z0-9]{min[, max]}`
    token = RANGE_ALPHANUMEMRIC_REG.exec(pattern);
    while (token != null) {
      const isNegated = token[1] === '^';
      const includesDash: boolean = token[2] === '-';
      const quantifierMin: string = token[4];
      const quantifierMax: string = token[5];
      const quantifierSymbol: string = token[6];

      const rangeCodes: number[] = [];

      let ranges = token[3];
      let range = SINGLE_RANGE_REG.exec(ranges);

      if (includesDash) {
        // 45 is the ascii code for '-'
        rangeCodes.push(45);
      }

      while (range != null) {
        if (!range[0].includes('-')) {
          // handle non-ranges
          if (isCaseInsensitive && isNaN(Number(range[0]))) {
            rangeCodes.push(
              range[0].toUpperCase().charCodeAt(0),
              range[0].toLowerCase().charCodeAt(0)
            );
          } else {
            rangeCodes.push(range[0].charCodeAt(0));
          }
        } else {
          // handle ranges
          const rangeMinMax = range[0].split('-').map((x) => x.charCodeAt(0));
          min = rangeMinMax[0];
          max = rangeMinMax[1];
          // throw error if min larger than max
          if (min > max) {
            throw new FakerError('Character range provided is out of order.');
          }

          for (let i = min; i <= max; i++) {
            if (isCaseInsensitive && isNaN(Number(String.fromCharCode(i)))) {
              const ch = String.fromCharCode(i);
              rangeCodes.push(
                ch.toUpperCase().charCodeAt(0),
                ch.toLowerCase().charCodeAt(0)
              );
            } else {
              rangeCodes.push(i);
            }
          }
        }

        ranges = ranges.substring(range[0].length);
        range = SINGLE_RANGE_REG.exec(ranges);
      }

      repetitions = getRepetitionsBasedOnQuantifierParameters(
        this.faker,
        quantifierSymbol,
        quantifierMin,
        quantifierMax
      );

      if (isNegated) {
        let index = -1;
        // 0-9
        for (let i = 48; i <= 57; i++) {
          index = rangeCodes.indexOf(i);
          if (index > -1) {
            rangeCodes.splice(index, 1);
            continue;
          }

          rangeCodes.push(i);
        }

        // A-Z
        for (let i = 65; i <= 90; i++) {
          index = rangeCodes.indexOf(i);
          if (index > -1) {
            rangeCodes.splice(index, 1);
            continue;
          }

          rangeCodes.push(i);
        }

        // a-z
        for (let i = 97; i <= 122; i++) {
          index = rangeCodes.indexOf(i);
          if (index > -1) {
            rangeCodes.splice(index, 1);
            continue;
          }

          rangeCodes.push(i);
        }
      }

      const generatedString = this.multiple(
        () => String.fromCharCode(this.arrayElement(rangeCodes)),
        { count: repetitions }
      ).join('');

      pattern =
        pattern.slice(0, token.index) +
        generatedString +
        pattern.slice(token.index + token[0].length);
      token = RANGE_ALPHANUMEMRIC_REG.exec(pattern);
    }

    const RANGE_REP_REG = /(.)\{(\d+),(\d+)\}/;
    // Deal with quantifier ranges `{min,max}`
    token = RANGE_REP_REG.exec(pattern);
    while (token != null) {
      min = parseInt(token[2]);
      max = parseInt(token[3]);
      // throw error if min larger than max
      if (min > max) {
        throw new FakerError('Numbers out of order in {} quantifier.');
      }

      repetitions = this.faker.number.int({ min, max });
      pattern =
        pattern.slice(0, token.index) +
        token[1].repeat(repetitions) +
        pattern.slice(token.index + token[0].length);
      token = RANGE_REP_REG.exec(pattern);
    }

    const REP_REG = /(.)\{(\d+)\}/;
    // Deal with repeat `{num}`
    token = REP_REG.exec(pattern);
    while (token != null) {
      repetitions = parseInt(token[2]);
      pattern =
        pattern.slice(0, token.index) +
        token[1].repeat(repetitions) +
        pattern.slice(token.index + token[0].length);
      token = REP_REG.exec(pattern);
    }

    return pattern;
  }

  /**
   * Takes an array and randomizes it in place then returns it.
   *
   * @template T The type of the elements to shuffle.
   *
   * @param list The array to shuffle.
   * @param options The options to use when shuffling.
   * @param options.inplace Whether to shuffle the array in place or return a new array. Defaults to `false`.
   *
   * @example
   * faker.helpers.shuffle(['a', 'b', 'c'], { inplace: true }) // [ 'b', 'c', 'a' ]
   *
   * @since 8.0.0
   */
  shuffle<T>(
    list: T[],
    options: {
      /**
       * Whether to shuffle the array in place or return a new array.
       *
       * @default false
       */
      inplace: true;
    }
  ): T[];
  /**
   * Returns a randomized version of the array.
   *
   * @template T The type of the elements to shuffle.
   *
   * @param list The array to shuffle.
   * @param options The options to use when shuffling.
   * @param options.inplace Whether to shuffle the array in place or return a new array. Defaults to `false`.
   *
   * @example
   * faker.helpers.shuffle(['a', 'b', 'c']) // [ 'b', 'c', 'a' ]
   * faker.helpers.shuffle(['a', 'b', 'c'], { inplace: false }) // [ 'b', 'c', 'a' ]
   *
   * @since 2.0.1
   */
  shuffle<T>(
    list: ReadonlyArray<T>,
    options?: {
      /**
       * Whether to shuffle the array in place or return a new array.
       *
       * @default false
       */
      inplace?: false;
    }
  ): T[];
  /**
   * Returns a randomized version of the array.
   *
   * @template T The type of the elements to shuffle.
   *
   * @param list The array to shuffle.
   * @param options The options to use when shuffling.
   * @param options.inplace Whether to shuffle the array in place or return a new array. Defaults to `false`.
   *
   * @example
   * faker.helpers.shuffle(['a', 'b', 'c']) // [ 'b', 'c', 'a' ]
   * faker.helpers.shuffle(['a', 'b', 'c'], { inplace: true }) // [ 'b', 'c', 'a' ]
   * faker.helpers.shuffle(['a', 'b', 'c'], { inplace: false }) // [ 'b', 'c', 'a' ]
   *
   * @since 2.0.1
   */
  shuffle<T>(
    list: T[],
    options?: {
      /**
       * Whether to shuffle the array in place or return a new array.
       *
       * @default false
       */
      inplace?: boolean;
    }
  ): T[];
  shuffle<T>(list: T[], options: { inplace?: boolean } = {}): T[] {
    const { inplace = false } = options;

    if (!inplace) {
      list = [...list];
    }

    for (let i = list.length - 1; i > 0; --i) {
      const j = this.faker.number.int(i);
      [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
  }

  /**
   * Takes an array of strings or function that returns a string
   * and outputs a unique array of strings based on that source.
   * This method does not store the unique state between invocations.
   *
   * If there are not enough unique values to satisfy the length, if
   * the source is an array, it will only return as many items as are
   * in the array. If the source is a function, it will return after
   * a maximum number of attempts has been reached.
   *
   * @template T The type of the elements.
   *
   * @param source The strings to choose from or a function that generates a string.
   * @param length The number of elements to generate.
   *
   * @example
   * faker.helpers.uniqueArray(faker.word.sample, 50)
   * faker.helpers.uniqueArray(faker.definitions.person.first_name, 6)
   * faker.helpers.uniqueArray(["Hello", "World", "Goodbye"], 2)
   *
   * @since 6.0.0
   */
  uniqueArray<T>(source: ReadonlyArray<T> | (() => T), length: number): T[] {
    if (Array.isArray(source)) {
      const set = new Set<T>(source);
      const array = [...set];
      return this.shuffle(array).splice(0, length);
    }

    const set = new Set<T>();
    try {
      if (typeof source === 'function') {
        const maxAttempts = 1000 * length;
        let attempts = 0;
        while (set.size < length && attempts < maxAttempts) {
          set.add(source());
          attempts++;
        }
      }
    } catch {
      // Ignore
    }

    return [...set];
  }

  /**
   * Replaces the `{{placeholder}}` patterns in the given string mustache style.
   *
   * @param str The template string to parse.
   * @param data The data used to populate the placeholders.
   * This is a record where the key is the template placeholder,
   * whereas the value is either a string or a function suitable for `String.replace()`.
   *
   * @example
   * faker.helpers.mustache('I found {{count}} instances of "{{word}}".', {
   *   count: () => `${faker.number.int()}`,
   *   word: "this word",
   * }) // 'I found 57591 instances of "this word".'
   *
   * @since 2.0.1
   */
  mustache(
    str: string | undefined,
    data: Record<string, string | Parameters<string['replace']>[1]>
  ): string {
    if (str == null) {
      return '';
    }

    for (const p in data) {
      const re = new RegExp(`{{${p}}}`, 'g');
      let value = data[p];
      if (typeof value === 'string') {
        // escape $, source: https://stackoverflow.com/a/6969486/6897682
        value = value.replace(/\$/g, '$$$$');
        str = str.replace(re, value);
      } else {
        str = str.replace(re, value);
      }
    }

    return str;
  }

  /**
   * Returns the result of the callback if the probability check was successful, otherwise `undefined`.
   *
   * @template TResult The type of result of the given callback.
   *
   * @param callback The callback to that will be invoked if the probability check was successful.
   * @param options The options to use. Defaults to `{}`.
   * @param options.probability The probability (`[0.00, 1.00]`) of the callback being invoked. Defaults to `0.5`.
   *
   * @example
   * faker.helpers.maybe(() => 'Hello World!') // 'Hello World!'
   * faker.helpers.maybe(() => 'Hello World!', { probability: 0.1 }) // undefined
   * faker.helpers.maybe(() => 'Hello World!', { probability: 0.9 }) // 'Hello World!'
   *
   * @since 6.3.0
   */
  maybe<TResult>(
    callback: () => TResult,
    options: {
      /**
       * The probability (`[0.00, 1.00]`) of the callback being invoked.
       *
       * @default 0.5
       */
      probability?: number;
    } = {}
  ): TResult | undefined {
    if (this.faker.datatype.boolean(options)) {
      return callback();
    }

    return undefined;
  }

  /**
   * Returns a random key from given object.
   *
   * @template T The type of the object to select from.
   *
   * @param object The object to be used.
   *
   * @throws If the given object is empty.
   *
   * @example
   * faker.helpers.objectKey({ myProperty: 'myValue' }) // 'myProperty'
   *
   * @since 6.3.0
   */
  objectKey<T extends Record<string, unknown>>(object: T): keyof T {
    const array: Array<keyof T> = Object.keys(object);
    return this.arrayElement(array);
  }

  /**
   * Returns a random value from given object.
   *
   * @template T The type of object to select from.
   *
   * @param object The object to be used.
   *
   * @throws If the given object is empty.
   *
   * @example
   * faker.helpers.objectValue({ myProperty: 'myValue' }) // 'myValue'
   *
   * @since 6.3.0
   */
  objectValue<T extends Record<string, unknown>>(object: T): T[keyof T] {
    const key = this.faker.helpers.objectKey(object);
    return object[key];
  }

  /**
   * Returns a random `[key, value]` pair from the given object.
   *
   * @template T The type of the object to select from.
   *
   * @param object The object to be used.
   *
   * @throws If the given object is empty.
   *
   * @example
   * faker.helpers.objectEntry({ prop1: 'value1', prop2: 'value2' }) // ['prop1', 'value1']
   *
   * @since 8.0.0
   */
  objectEntry<T extends Record<string, unknown>>(
    object: T
  ): [keyof T, T[keyof T]] {
    const key = this.faker.helpers.objectKey(object);
    return [key, object[key]];
  }

  /**
   * Returns random element from the given array.
   *
   * @template T The type of the elements to pick from.
   *
   * @param array The array to pick the value from.
   *
   * @throws If the given array is empty.
   *
   * @example
   * faker.helpers.arrayElement(['cat', 'dog', 'mouse']) // 'dog'
   *
   * @since 6.3.0
   */
  arrayElement<T>(array: ReadonlyArray<T>): T {
    // TODO @xDivisionByZerox 2023-04-20: Remove in v9
    if (array == null) {
      throw new FakerError(
        'Calling `faker.helpers.arrayElement()` without arguments is no longer supported.'
      );
    }

    if (array.length === 0) {
      throw new FakerError('Cannot get value from empty dataset.');
    }

    const index =
      array.length > 1 ? this.faker.number.int({ max: array.length - 1 }) : 0;

    return array[index];
  }

  /**
   * Returns a weighted random element from the given array. Each element of the array should be an object with two keys `weight` and `value`.
   *
   * - Each `weight` key should be a number representing the probability of selecting the value, relative to the sum of the weights. Weights can be any positive float or integer.
   * - Each `value` key should be the corresponding value.
   *
   * For example, if there are two values A and B, with weights 1 and 2 respectively, then the probability of picking A is 1/3 and the probability of picking B is 2/3.
   *
   * @template T The type of the elements to pick from.
   *
   * @param array Array to pick the value from.
   * @param array[].weight The weight of the value.
   * @param array[].value The value to pick.
   *
   * @example
   * faker.helpers.weightedArrayElement([{ weight: 5, value: 'sunny' }, { weight: 4, value: 'rainy' }, { weight: 1, value: 'snowy' }]) // 'sunny', 50% of the time, 'rainy' 40% of the time, 'snowy' 10% of the time
   *
   * @since 8.0.0
   */
  weightedArrayElement<T>(
    array: ReadonlyArray<{
      /**
       * The weight of the value.
       */
      weight: number;
      /**
       * The value to pick.
       */
      value: T;
    }>
  ): T {
    if (array.length === 0) {
      throw new FakerError(
        'weightedArrayElement expects an array with at least one element'
      );
    }

    if (!array.every((elt) => elt.weight > 0)) {
      throw new FakerError(
        'weightedArrayElement expects an array of { weight, value } objects where weight is a positive number'
      );
    }

    const total = array.reduce((acc, { weight }) => acc + weight, 0);
    const random = this.faker.number.float({
      min: 0,
      max: total,
      precision: 1e-9,
    });
    let current = 0;
    for (const { weight, value } of array) {
      current += weight;
      if (random < current) {
        return value;
      }
    }

    // In case of rounding errors, return the last element
    return array[array.length - 1].value;
  }

  /**
   * Returns a subset with random elements of the given array in random order.
   *
   * @template T The type of the elements to pick from.
   *
   * @param array Array to pick the value from.
   * @param count Number or range of elements to pick.
   *    When not provided, random number of elements will be picked.
   *    When value exceeds array boundaries, it will be limited to stay inside.
   *
   * @example
   * faker.helpers.arrayElements(['cat', 'dog', 'mouse']) // ['mouse', 'cat']
   * faker.helpers.arrayElements([1, 2, 3, 4, 5], 2) // [4, 2]
   * faker.helpers.arrayElements([1, 2, 3, 4, 5], { min: 2, max: 4 }) // [3, 5, 1]
   *
   * @since 6.3.0
   */
  arrayElements<T>(
    array: ReadonlyArray<T>,
    count?:
      | number
      | {
          /**
           * The minimum number of elements to pick.
           */
          min: number;
          /**
           * The maximum number of elements to pick.
           */
          max: number;
        }
  ): T[] {
    // TODO @xDivisionByZerox 2023-04-20: Remove in v9
    if (array == null) {
      throw new FakerError(
        'Calling `faker.helpers.arrayElements()` without arguments is no longer supported.'
      );
    }

    if (array.length === 0) {
      return [];
    }

    const numElements = this.rangeToNumber(
      count ?? { min: 1, max: array.length }
    );

    if (numElements >= array.length) {
      return this.shuffle(array);
    } else if (numElements <= 0) {
      return [];
    }

    const arrayCopy = [...array];
    let i = array.length;
    const min = i - numElements;
    let temp: T;
    let index: number;

    // Shuffle the last `count` elements of the array
    while (i-- > min) {
      index = this.faker.number.int(i);
      temp = arrayCopy[index];
      arrayCopy[index] = arrayCopy[i];
      arrayCopy[i] = temp;
    }

    return arrayCopy.slice(min);
  }

  /**
   * Returns a random value from an Enum object.
   *
   * This does the same as `objectValue` except that it ignores (the values assigned to) the numeric keys added for TypeScript enums.
   *
   * @template T Type of generic enums, automatically inferred by TypeScript.
   *
   * @param enumObject Enum to pick the value from.
   *
   * @example
   * enum Color { Red, Green, Blue }
   * faker.helpers.enumValue(Color) // 1 (Green)
   *
   * enum Direction { North = 'North', South = 'South'}
   * faker.helpers.enumValue(Direction) // 'South'
   *
   * enum HttpStatus { Ok = 200, Created = 201, BadRequest = 400, Unauthorized = 401 }
   * faker.helpers.enumValue(HttpStatus) // 200 (Ok)
   *
   * @since 8.0.0
   */
  enumValue<T extends Record<string | number, string | number>>(
    enumObject: T
  ): T[keyof T] {
    // ignore numeric keys added by TypeScript
    const keys: Array<keyof T> = Object.keys(enumObject).filter((key) =>
      isNaN(Number(key))
    );
    const randomKey = this.arrayElement(keys);
    return enumObject[randomKey];
  }

  /**
   * Helper method that converts the given number or range to a number.
   *
   * @param numberOrRange The number or range to convert.
   * @param numberOrRange.min The minimum value for the range.
   * @param numberOrRange.max The maximum value for the range.
   *
   * @example
   * faker.helpers.rangeToNumber(1) // 1
   * faker.helpers.rangeToNumber({ min: 1, max: 10 }) // 5
   *
   * @since 8.0.0
   */
  rangeToNumber(
    numberOrRange:
      | number
      | {
          /**
           * The minimum value for the range.
           */
          min: number;
          /**
           * The maximum value for the range.
           */
          max: number;
        }
  ): number {
    if (typeof numberOrRange === 'number') {
      return numberOrRange;
    }

    return this.faker.number.int(numberOrRange);
  }

  /**
   * Generates a unique result using the results of the given method.
   * Used unique entries will be stored internally and filtered from subsequent calls.
   *
   * @template TMethod The type of the method to execute.
   *
   * @param method The method used to generate the values.
   * @param args The arguments used to call the method.
   * @param options The optional options used to configure this method.
   * @param options.startTime This parameter does nothing.
   * @param options.maxTime The time in milliseconds this method may take before throwing an error. Defaults to `50`.
   * @param options.maxRetries The total number of attempts to try before throwing an error. Defaults to `50`.
   * @param options.currentIterations This parameter does nothing.
   * @param options.exclude The value or values that should be excluded/skipped. Defaults to `[]`.
   * @param options.compare The function used to determine whether a value was already returned. Defaults to check the existence of the key.
   * @param options.store The store of unique entries. Defaults to a global store.
   *
   * @see https://github.com/faker-js/faker/issues/1785#issuecomment-1407773744
   *
   * @example
   * faker.helpers.unique(faker.person.firstName) // 'Corbin'
   *
   * @since 7.5.0
   *
   * @deprecated Please find a dedicated npm package instead, or even create one on your own if you want to.
   * More info can be found in issue [faker-js/faker #1785](https://github.com/faker-js/faker/issues/1785).
   */
  unique<
    TMethod extends (
      // TODO @Shinigami92 2023-02-14: This `any` type can be fixed by anyone if they want to.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...parameters: any[]
    ) => RecordKey,
  >(
    method: TMethod,
    args: Parameters<TMethod> = [] as Parameters<TMethod>,
    options: {
      /**
       * This parameter does nothing.
       *
       * @default new Date().getTime()
       */
      startTime?: number;
      /**
       * The time in milliseconds this method may take before throwing an error.
       *
       * @default 50
       */
      maxTime?: number;
      /**
       * The total number of attempts to try before throwing an error.
       *
       * @default 50
       */
      maxRetries?: number;
      /**
       * This parameter does nothing.
       *
       * @default 0
       */
      currentIterations?: number;
      /**
       * The value or values that should be excluded/skipped.
       *
       * @default []
       */
      exclude?: RecordKey | RecordKey[];
      /**
       * The function used to determine whether a value was already returned.
       *
       * Defaults to check the existence of the key.
       *
       * @default (obj, key) => (obj[key] === undefined ? -1 : 0)
       */
      compare?: (obj: Record<RecordKey, RecordKey>, key: RecordKey) => 0 | -1;
      /**
       * The store of unique entries.
       *
       * Defaults to a global store.
       */
      store?: Record<RecordKey, RecordKey>;
    } = {}
  ): ReturnType<TMethod> {
    deprecated({
      deprecated: 'faker.helpers.unique',
      proposed:
        'https://github.com/faker-js/faker/issues/1785#issuecomment-1407773744',
      since: '8.0',
      until: '9.0',
    });

    const {
      maxTime = 50,
      maxRetries = 50,
      exclude = [],
      store = this.uniqueStore,
    } = options;
    return uniqueExec.exec(method, args, {
      ...options,
      startTime: Date.now(),
      maxTime,
      maxRetries,
      currentIterations: 0,
      exclude,
      store,
    });
  }

  /**
   * Generates an array containing values returned by the given method.
   *
   * @template TResult The type of elements.
   *
   * @param method The method used to generate the values.
   * @param options The optional options object.
   * @param options.count The number or range of elements to generate. Defaults to `3`.
   *
   * @example
   * faker.helpers.multiple(faker.person.firstName) // [ 'Aniya', 'Norval', 'Dallin' ]
   * faker.helpers.multiple(faker.person.firstName, { count: 3 }) // [ 'Santos', 'Lavinia', 'Lavinia' ]
   *
   * @since 8.0.0
   */
  multiple<TResult>(
    method: () => TResult,
    options: {
      /**
       * The number or range of elements to generate.
       *
       * @default 3
       */
      count?:
        | number
        | {
            /**
             * The minimum value for the range.
             */
            min: number;
            /**
             * The maximum value for the range.
             */
            max: number;
          };
    } = {}
  ): TResult[] {
    const count = this.rangeToNumber(options.count ?? 3);
    if (count <= 0) {
      return [];
    }

    // TODO @ST-DDT 2022-11-21: Add support for unique option

    return Array.from({ length: count }, method);
  }
}

/**
 * Module with various helper methods providing basic (seed-dependent) operations useful for implementing faker methods.
 *
 * ### Overview
 *
 * A particularly helpful method is [`arrayElement()`](https://fakerjs.dev/api/helpers.html#arrayelement) which returns a random element from an array. This is useful when adding custom data that Faker doesn't contain.
 *
 * There are alternatives of this method for objects ([`objectKey()`](https://fakerjs.dev/api/helpers.html#objectkey) and [`objectValue()`](https://fakerjs.dev/api/helpers.html#objectvalue)) and enums ([`enumValue()`](https://fakerjs.dev/api/helpers.html#enumvalue)). You can also return multiple elements ([`arrayElements()`](https://fakerjs.dev/api/helpers.html#arrayelements)) or elements according to a weighting ([`weightedArrayElement()`](https://fakerjs.dev/api/helpers.html#weightedarrayelement)).
 *
 * A number of methods can generate strings according to various patterns: [`replaceSymbols()`](https://fakerjs.dev/api/helpers.html#replacesymbols), [`replaceSymbolWithNumber()`](https://fakerjs.dev/api/helpers.html#replacesymbolwithnumber), and [`fromRegExp()`](https://fakerjs.dev/api/helpers.html#fromregexp).
 */
export class HelpersModule extends SimpleHelpersModule {
  constructor(protected readonly faker: Faker) {
    super(faker);
  }

  /**
   * Generator for combining faker methods based on a static string input.
   *
   * Note: We recommend using string template literals instead of `fake()`,
   * which are faster and strongly typed (if you are using TypeScript),
   * e.g. ``const address = `${faker.location.zipCode()} ${faker.location.city()}`;``
   *
   * This method is useful if you have to build a random string from a static, non-executable source
   * (e.g. string coming from a user, stored in a database or a file).
   *
   * It checks the given string for placeholders and replaces them by calling faker methods:
   *
   * ```js
   * const hello = faker.helpers.fake('Hi, my name is {{person.firstName}} {{person.lastName}}!');
   * ```
   *
   * This would use the `faker.person.firstName()` and `faker.person.lastName()` method to resolve the placeholders respectively.
   *
   * It is also possible to provide parameters. At first, they will be parsed as json,
   * and if that isn't possible, we will fall back to string:
   *
   * ```js
   * const message = faker.helpers.fake('You can call me at {{phone.number(+!# !## #### #####!)}}.');
   * ```
   *
   * It is also possible to use multiple parameters (comma separated).
   *
   * ```js
   * const message = faker.helpers.fake('Your pin is {{string.numeric(4, {"allowLeadingZeros": true})}}.');
   * ```
   *
   * It is also NOT possible to use any non-faker methods or plain javascript in such patterns.
   *
   * @param pattern The pattern string that will get interpolated.
   *
   * @see faker.helpers.mustache() to use custom functions for resolution.
   *
   * @example
   * faker.helpers.fake('{{person.lastName}}') // 'Barrows'
   * faker.helpers.fake('{{person.lastName}}, {{person.firstName}} {{person.suffix}}') // 'Durgan, Noe MD'
   * faker.helpers.fake('This is static test.') // 'This is static test.'
   * faker.helpers.fake('Good Morning {{person.firstName}}!') // 'Good Morning Estelle!'
   * faker.helpers.fake('You can call me at {{phone.number(!## ### #####!)}}.') // 'You can call me at 202 555 973722.'
   * faker.helpers.fake('I flipped the coin and got: {{helpers.arrayElement(["heads", "tails"])}}') // 'I flipped the coin and got: tails'
   * faker.helpers.fake('Your PIN number is: {{string.numeric(4, {"exclude": ["0"]})}}') // 'Your PIN number is: 4834'
   *
   * @since 7.4.0
   */
  fake(pattern: string): string;
  /**
   * Generator for combining faker methods based on an array containing static string inputs.
   *
   * Note: We recommend using string template literals instead of `fake()`,
   * which are faster and strongly typed (if you are using TypeScript),
   * e.g. ``const address = `${faker.location.zipCode()} ${faker.location.city()}`;``
   *
   * This method is useful if you have to build a random string from a static, non-executable source
   * (e.g. string coming from a user, stored in a database or a file).
   *
   * It checks the given string for placeholders and replaces them by calling faker methods:
   *
   * ```js
   * const hello = faker.helpers.fake(['Hi, my name is {{person.firstName}} {{person.lastName}}!']);
   * ```
   *
   * This would use the `faker.person.firstName()` and `faker.person.lastName()` method to resolve the placeholders respectively.
   *
   * It is also possible to provide parameters. At first, they will be parsed as json,
   * and if that isn't possible, it will fall back to string:
   *
   * ```js
   * const message = faker.helpers.fake([
   *   'You can call me at {{phone.number(+!# !## #### #####!)}}.',
   *   'My email is {{internet.email}}.',
   * ]);
   * ```
   *
   * It is also possible to use multiple parameters (comma separated).
   *
   * ```js
   * const message = faker.helpers.fake(['Your pin is {{string.numeric(4, {"allowLeadingZeros": true})}}.']);
   * ```
   *
   * It is also NOT possible to use any non-faker methods or plain javascript in such patterns.
   *
   * @param patterns The array to select a pattern from, that will then get interpolated. Must not be empty.
   *
   * @see faker.helpers.mustache() to use custom functions for resolution.
   *
   * @example
   * faker.helpers.fake(['A: {{person.firstName}}', 'B: {{person.lastName}}']) // 'A: Barry'
   *
   * @since 8.0.0
   */
  fake(patterns: ReadonlyArray<string>): string;
  /**
   * Generator for combining faker methods based on a static string input or an array of static string inputs.
   *
   * Note: We recommend using string template literals instead of `fake()`,
   * which are faster and strongly typed (if you are using TypeScript),
   * e.g. ``const address = `${faker.location.zipCode()} ${faker.location.city()}`;``
   *
   * This method is useful if you have to build a random string from a static, non-executable source
   * (e.g. string coming from a user, stored in a database or a file).
   *
   * It checks the given string for placeholders and replaces them by calling faker methods:
   *
   * ```js
   * const hello = faker.helpers.fake('Hi, my name is {{person.firstName}} {{person.lastName}}!');
   * ```
   *
   * This would use the `faker.person.firstName()` and `faker.person.lastName()` method to resolve the placeholders respectively.
   *
   * It is also possible to provide parameters. At first, they will be parsed as json,
   * and if that isn't possible, it will fall back to string:
   *
   * ```js
   * const message = faker.helpers.fake('You can call me at {{phone.number(+!# !## #### #####!)}}.');
   * ```
   *
   * It is also possible to use multiple parameters (comma separated).
   *
   * ```js
   * const message = faker.helpers.fake('Your pin is {{string.numeric(4, {"allowLeadingZeros": true})}}.');
   * ```
   *
   * It is also NOT possible to use any non-faker methods or plain javascript in such patterns.
   *
   * @param pattern The pattern string that will get interpolated. If an array is passed, a random element will be picked and interpolated.
   *
   * @see faker.helpers.mustache() to use custom functions for resolution.
   *
   * @example
   * faker.helpers.fake('{{person.lastName}}') // 'Barrows'
   * faker.helpers.fake('{{person.lastName}}, {{person.firstName}} {{person.suffix}}') // 'Durgan, Noe MD'
   * faker.helpers.fake('This is static test.') // 'This is static test.'
   * faker.helpers.fake('Good Morning {{person.firstName}}!') // 'Good Morning Estelle!'
   * faker.helpers.fake('You can visit me at {{location.streetAddress(true)}}.') // 'You can visit me at 3393 Ronny Way Apt. 742.'
   * faker.helpers.fake('I flipped the coin and got: {{helpers.arrayElement(["heads", "tails"])}}') // 'I flipped the coin and got: tails'
   * faker.helpers.fake(['A: {{person.firstName}}', 'B: {{person.lastName}}']) // 'A: Barry'
   *
   * @since 7.4.0
   */
  fake(pattern: string | ReadonlyArray<string>): string;
  fake(pattern: string | ReadonlyArray<string>): string {
    pattern =
      typeof pattern === 'string' ? pattern : this.arrayElement(pattern);

    // find first matching {{ and }}
    const start = pattern.search(/{{[a-z]/);
    const end = pattern.indexOf('}}', start);

    // if no {{ and }} is found, we are done
    if (start === -1 || end === -1) {
      return pattern;
    }

    // extract method name from between the {{ }} that we found
    // for example: {{person.firstName}}
    const token = pattern.substring(start + 2, end + 2);
    let method = token.replace('}}', '').replace('{{', '');

    // extract method parameters
    const regExp = /\(([^)]*)\)/;
    const matches = regExp.exec(method);
    let parameters = '';
    if (matches) {
      method = method.replace(regExp, '');
      parameters = matches[1];
    }

    // split the method into module and function
    const parts = method.split('.');

    let currentModuleOrMethod: unknown = this.faker;
    let currentDefinitions: unknown = this.faker.rawDefinitions;

    // Search for the requested method or definition
    for (const part of parts) {
      currentModuleOrMethod =
        currentModuleOrMethod?.[part as keyof typeof currentModuleOrMethod];
      currentDefinitions =
        currentDefinitions?.[part as keyof typeof currentDefinitions];
    }

    // Make method executable
    let fn: (...args: unknown[]) => unknown;
    if (typeof currentModuleOrMethod === 'function') {
      fn = currentModuleOrMethod as (args?: unknown) => unknown;
    } else if (Array.isArray(currentDefinitions)) {
      fn = () =>
        this.faker.helpers.arrayElement(currentDefinitions as unknown[]);
    } else {
      throw new FakerError(`Invalid module method or definition: ${method}
- faker.${method} is not a function
- faker.definitions.${method} is not an array`);
    }

    // assign the function from the module.function namespace
    fn = fn.bind(this);

    // If parameters are populated here, they are always going to be of string type
    // since we might actually be dealing with an object or array,
    // we always attempt to the parse the incoming parameters into JSON
    let params: unknown[];
    // Note: we experience a small performance hit here due to JSON.parse try / catch
    // If anyone actually needs to optimize this specific code path, please open a support issue on github
    try {
      params = JSON.parse(`[${parameters}]`);
    } catch {
      // since JSON.parse threw an error, assume parameters was actually a string
      params = [parameters];
    }

    const result = String(fn(...params));

    // Replace the found tag with the returned fake value
    // We cannot use string.replace here because the result might contain evaluated characters
    const res =
      pattern.substring(0, start) + result + pattern.substring(end + 2);

    // return the response recursively until we are done finding all tags
    return this.fake(res);
  }
}
