import type { Faker } from '../../faker';
import { SimpleModuleBase } from '../../internal/module-base';
import type { NumberOrRange } from '../../utils/types';
import { fakeEval } from './_eval';
import { arrayElement as helpersArrayElement } from './array-element';
import { arrayElements as helpersArrayElements } from './array-elements';
import { enumValue as helpersEnumValue } from './enum-value';
import { fromRegExp as helpersFromRegExp } from './from-reg-exp';
import { maybe as helpersMaybe } from './maybe';
import { multiple as helpersMultiple } from './multiple';
import { mustache as helpersMustache } from './mustache';
import { objectEntry as helpersObjectEntry } from './object-entry';
import { objectKey as helpersObjectKey } from './object-key';
import { objectValue as helpersObjectValue } from './object-value';
import { rangeToNumber as helpersRangeToNumber } from './range-to-number';
import { replaceCreditCardSymbols as helpersReplaceCreditCardSymbols } from './replace-credit-card-symbols';
import { replaceSymbols as helpersReplaceSymbols } from './replace-symbols';
import { shuffle as helpersShuffle } from './shuffle';
import { slugify as helpersSlugify } from './slugify';
import { uniqueArray as helpersUniqueArray } from './unique-array';
import { weightedArrayElement as helpersWeightedArrayElement } from './weighted-array-element';

/**
 * Module with various helper methods providing basic (seed-dependent) operations useful for implementing faker methods (without methods requiring localized data).
 */
export class SimpleHelpersModule extends SimpleModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree helpers' to update the methods from their respective files.
   */

  /**
   * Slugifies the given string.
   * For that all spaces (` `) are replaced by hyphens (`-`)
   * and most non word characters except for dots and hyphens will be removed.
   *
   * @param string The input to slugify. Defaults to `''`.
   *
   * @example
   * faker.helpers.slugify() // ''
   * faker.helpers.slugify("Hello world!") // 'Hello-world'
   *
   * @since 2.0.1
   */
  slugify(string: string = ''): string {
    return helpersSlugify(this.faker.fakerCore, string);
  }

  /**
   * Parses the given string symbol by symbol and replaces the placeholder appropriately.
   *
   * - `#` will be replaced with a digit (`0` - `9`).
   * - `?` will be replaced with an upper letter ('A' - 'Z')
   * - and `*` will be replaced with either a digit or letter.
   *
   * @param string The template string to parse. Defaults to `''`.
   *
   * @example
   * faker.helpers.replaceSymbols() // ''
   * faker.helpers.replaceSymbols('#####') // '98441'
   * faker.helpers.replaceSymbols('?????') // 'ZYRQQ'
   * faker.helpers.replaceSymbols('*****') // '4Z3P7'
   * faker.helpers.replaceSymbols('Your pin is: #?*#?*') // 'Your pin is: 0T85L1'
   *
   * @since 3.0.0
   */
  replaceSymbols(string: string = ''): string {
    return helpersReplaceSymbols(this.faker.fakerCore, string);
  }

  /**
   * Replaces the symbols and patterns in a credit card schema including Luhn checksum.
   *
   * This method supports both range patterns `[4-9]` as well as the patterns used by `replaceSymbolWithNumber()`.
   * `L` will be replaced with the appropriate Luhn checksum.
   *
   * @param string The credit card format pattern. Defaults to `'6453-####-####-####-###L'`.
   * @param symbol The symbol to replace with a digit. Defaults to `'#'`.
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
    return helpersReplaceCreditCardSymbols(
      this.faker.fakerCore,
      string,
      symbol
    );
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
   * @throws {FakerError} If min value is more than max value in quantifier, e.g. `#{10,5}`.
   * @throws {FakerError} If an invalid quantifier symbol is passed in.
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
    return helpersFromRegExp(this.faker.fakerCore, pattern);
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
  shuffle<const T>(
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
  shuffle<const T>(
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
  shuffle<const T>(
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
  shuffle<const T>(list: T[], options: { inplace?: boolean } = {}): T[] {
    return helpersShuffle(this.faker.fakerCore, list, options);
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
   * faker.helpers.uniqueArray(faker.word.sample, 3) // ['mob', 'junior', 'ripe']
   * faker.helpers.uniqueArray(faker.definitions.person.first_name.generic, 6) // ['Silas', 'Montana', 'Lorenzo', 'Alayna', 'Aditya', 'Antone']
   * faker.helpers.uniqueArray(["Hello", "World", "Goodbye"], 2) // ['World', 'Goodbye']
   *
   * @since 6.0.0
   */
  uniqueArray<const T>(
    source: ReadonlyArray<T> | (() => T),
    length: number
  ): T[] {
    return helpersUniqueArray(this.faker.fakerCore, source, length);
  }

  /**
   * Replaces the `{{placeholder}}` patterns in the given string mustache style.
   *
   * @param text The template string to parse.
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
    text: string | undefined,
    data: Record<string, string | Parameters<string['replace']>[1]>
  ): string {
    return helpersMustache(this.faker.fakerCore, text, data);
  }

  /**
   * Returns the result of the callback if the probability check was successful, otherwise `undefined`.
   *
   * @template TResult The type of result of the given callback.
   *
   * @param callback The callback that will be invoked if the probability check was successful.
   * @param options The options to use.
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
    return helpersMaybe(this.faker.fakerCore, callback, options);
  }

  /**
   * Returns a random key from the given object.
   *
   * @template T The type of the object to select from.
   *
   * @param object The object to be used.
   *
   * @throws {FakerError} If the given object is empty.
   *
   * @example
   * faker.helpers.objectKey({ Cheetah: 120, Falcon: 390, Snail: 0.03 }) // 'Falcon'
   *
   * @since 6.3.0
   */
  objectKey<const T extends Record<string, unknown>>(object: T): keyof T {
    return helpersObjectKey(this.faker.fakerCore, object);
  }

  /**
   * Returns a random value from the given object.
   *
   * @template T The type of object to select from.
   *
   * @param object The object to be used.
   *
   * @throws {FakerError} If the given object is empty.
   *
   * @example
   * faker.helpers.objectValue({ Cheetah: 120, Falcon: 390, Snail: 0.03 }) // 390
   *
   * @since 6.3.0
   */
  objectValue<const T extends Record<string, unknown>>(object: T): T[keyof T] {
    return helpersObjectValue(this.faker.fakerCore, object);
  }

  /**
   * Returns a random `[key, value]` pair from the given object.
   *
   * @template T The type of the object to select from.
   *
   * @param object The object to be used.
   *
   * @throws {FakerError} If the given object is empty.
   *
   * @example
   * faker.helpers.objectEntry({ Cheetah: 120, Falcon: 390, Snail: 0.03 }) // ['Snail', 0.03]
   *
   * @since 8.0.0
   */
  objectEntry<const T extends Record<string, unknown>>(
    object: T
  ): [keyof T, T[keyof T]] {
    return helpersObjectEntry(this.faker.fakerCore, object);
  }

  /**
   * Returns random element from the given array.
   *
   * @template T The type of the elements to pick from.
   *
   * @param array The array to pick the value from.
   *
   * @throws {FakerError} If the given array is empty.
   *
   * @example
   * faker.helpers.arrayElement(['cat', 'dog', 'mouse']) // 'dog'
   *
   * @since 6.3.0
   */
  arrayElement<const T>(array: ReadonlyArray<T>): T {
    return helpersArrayElement(this.faker.fakerCore, array);
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
   * @throws {FakerError} If the array is empty.
   * @throws {FakerError} If any element's weight is not a positive number.
   *
   * @example
   * faker.helpers.weightedArrayElement([{ weight: 5, value: 'sunny' }, { weight: 4, value: 'rainy' }, { weight: 1, value: 'snowy' }]) // 'sunny', 50% of the time, 'rainy' 40% of the time, 'snowy' 10% of the time
   *
   * @since 8.0.0
   */
  weightedArrayElement<const T>(
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
    return helpersWeightedArrayElement(this.faker.fakerCore, array);
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
  arrayElements<const T>(array: ReadonlyArray<T>, count?: NumberOrRange): T[] {
    return helpersArrayElements(this.faker.fakerCore, array, count);
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
    return helpersEnumValue(this.faker.fakerCore, enumObject);
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
  rangeToNumber(numberOrRange: NumberOrRange): number {
    return helpersRangeToNumber(this.faker.fakerCore, numberOrRange);
  }

  /**
   * Generates an array containing values returned by the given method.
   *
   * @template TResult The type of elements.
   *
   * @param method The method used to generate the values.
   * The method will be called with `(_, index)`, to allow using the index in the generated value e.g. as id.
   * @param options The optional options object.
   * @param options.count The number or range of elements to generate. Defaults to `3`.
   *
   * @example
   * faker.helpers.multiple(() => faker.person.firstName()) // [ 'Aniya', 'Norval', 'Dallin' ]
   * faker.helpers.multiple(() => faker.person.firstName(), { count: 3 }) // [ 'Santos', 'Lavinia', 'Lavinia' ]
   * faker.helpers.multiple((_, i) => `${faker.color.human()}-${i + 1}`) // [ 'orange-1', 'orchid-2', 'sky blue-3' ]
   *
   * @since 8.0.0
   */
  multiple<TResult>(
    method: (v: unknown, index: number) => TResult,
    options: {
      /**
       * The number or range of elements to generate.
       *
       * @default 3
       */
      count?: NumberOrRange;
    } = {}
  ): TResult[] {
    return helpersMultiple(this.faker.fakerCore, method, options);
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
 * A number of methods can generate strings according to various patterns: [`replaceSymbols()`](https://fakerjs.dev/api/helpers.html#replacesymbols) and [`fromRegExp()`](https://fakerjs.dev/api/helpers.html#fromregexp).
 */
export class HelpersModule extends SimpleHelpersModule {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree helpers' to update the methods from their respective files.
   */

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
   * that you control (e.g. a template authored by a developer or stored in a database or file).
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
   * Properties and prototype methods on generated values can also be resolved:
   *
   * ```js
   * const airlineCode = faker.helpers.fake('{{airline.airline.iataCode}}'); // 'AA'
   * const timestamp = faker.helpers.fake('{{date.anytime.toISOString}}'); // '2025-01-01T00:00:00.000Z'
   * ```
   *
   * The pattern is not evaluated as JavaScript: only faker methods can be called, and any
   * parameters are parsed as JSON or plain strings. Nevertheless, it is possible for certain
   * maliciously crafted patterns to use large amounts of memory or CPU time, so the pattern
   * itself must always be from trusted input. Do not evaluate patterns provided by untrusted
   * user input or external sources.
   *
   * @param pattern The pattern string that will get interpolated.
   *
   * @see faker.helpers.mustache(): For using custom functions to resolve templates.
   *
   * @example
   * faker.helpers.fake('{{person.lastName}}') // 'Barrows'
   * faker.helpers.fake('{{person.lastName}}, {{person.firstName}} {{person.suffix}}') // 'Durgan, Noe MD'
   * faker.helpers.fake('This is static test.') // 'This is static test.'
   * faker.helpers.fake('Good Morning {{person.firstName}}!') // 'Good Morning Estelle!'
   * faker.helpers.fake('You can visit me at {{location.streetAddress(true)}}.') // 'You can visit me at 3393 Ronny Way Apt. 742.'
   * faker.helpers.fake('I flipped the coin and got: {{helpers.arrayElement(["heads", "tails"])}}') // 'I flipped the coin and got: tails'
   * faker.helpers.fake('Your PIN number is: {{string.numeric(4, {"exclude": ["0"]})}}') // 'Your PIN number is: 4834'
   * faker.helpers.fake('Expires on {{date.future.toISOString.substring(0,10)}}') // 'Expires on 2026-09-09'
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
   * that you control (e.g. a template authored by a developer or stored in a database or file).
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
   * Properties and prototype methods on generated values can also be resolved:
   *
   * ```js
   * const airlineCode = faker.helpers.fake(['{{airline.airline.iataCode}}']); // 'AA'
   * const timestamp = faker.helpers.fake(['{{date.anytime.toISOString}}']); // '2025-01-01T00:00:00.000Z'
   * ```
   *
   * The pattern is not evaluated as JavaScript: only faker methods can be called, and any
   * parameters are parsed as JSON or plain strings. Nevertheless, it is possible for certain
   * maliciously crafted patterns to use large amounts of memory or CPU time, so the pattern
   * itself must always be from trusted input. Do not evaluate patterns provided by untrusted
   * user input or external sources.
   *
   * @param patterns The array to select a pattern from, that will then get interpolated. Must not be empty.
   *
   * @see faker.helpers.mustache(): For using custom functions to resolve templates.
   *
   * @example
   * faker.helpers.fake(['A: {{person.firstName}}', 'B: {{person.lastName}}']) // 'A: Barry'
   * faker.helpers.fake(['Your PIN number is: {{string.numeric(4, {"exclude": ["0"]})}}']) // 'Your PIN number is: 4834'
   * faker.helpers.fake(['Expires on {{date.future.toISOString.substring(0,10)}}']) // 'Expires on 2026-09-09'
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
   * that you control (e.g. a template authored by a developer or stored in a database or file).
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
   * Properties and prototype methods on generated values can also be resolved:
   *
   * ```js
   * const airlineCode = faker.helpers.fake('{{airline.airline.iataCode}}'); // 'AA'
   * const timestamp = faker.helpers.fake('{{date.anytime.toISOString}}'); // '2025-01-01T00:00:00.000Z'
   * ```
   *
   * The pattern is not evaluated as JavaScript: only faker methods can be called, and any
   * parameters are parsed as JSON or plain strings. Nevertheless, it is possible for certain
   * maliciously crafted patterns to use large amounts of memory or CPU time, so the pattern
   * itself must always be from trusted input. Do not evaluate patterns provided by untrusted
   * user input or external sources.
   *
   * @param pattern The pattern string that will get interpolated. If an array is passed, a random element will be picked and interpolated.
   *
   * @see faker.helpers.mustache(): For using custom functions to resolve templates.
   *
   * @example
   * faker.helpers.fake('{{person.lastName}}') // 'Barrows'
   * faker.helpers.fake('{{person.lastName}}, {{person.firstName}} {{person.suffix}}') // 'Durgan, Noe MD'
   * faker.helpers.fake('This is static test.') // 'This is static test.'
   * faker.helpers.fake('Good Morning {{person.firstName}}!') // 'Good Morning Estelle!'
   * faker.helpers.fake('You can visit me at {{location.streetAddress(true)}}.') // 'You can visit me at 3393 Ronny Way Apt. 742.'
   * faker.helpers.fake('I flipped the coin and got: {{helpers.arrayElement(["heads", "tails"])}}') // 'I flipped the coin and got: tails'
   * faker.helpers.fake(['A: {{person.firstName}}', 'B: {{person.lastName}}']) // 'A: Barry'
   * faker.helpers.fake('Your PIN number is: {{string.numeric(4, {"exclude": ["0"]})}}') // 'Your PIN number is: 4834'
   * faker.helpers.fake(['Expires on {{date.future.toISOString.substring(0,10)}}']) // 'Expires on 2026-09-09'
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
    const method = token.replace('}}', '').replace('{{', '');

    const result = fakeEval(method, this.faker);
    const stringified = String(result);

    // Replace the found tag with the returned fake value
    // We cannot use string.replace here because the result might contain evaluated characters
    const patched =
      pattern.substring(0, start) + stringified + pattern.substring(end + 2);

    // return the response recursively until we are done finding all tags
    return this.fake(patched);
  }
}
