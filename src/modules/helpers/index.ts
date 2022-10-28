import type { Faker } from '../..';
import { FakerError } from '../../errors/faker-error';
import { luhnCheckValue } from './luhn-check';
import type { RecordKey } from './unique';
import * as uniqueExec from './unique';

/**
 * Module with various helper methods that transform the method input rather than returning values from locales.
 * The transformation process may call methods that use the locale data.
 */
export class HelpersModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(HelpersModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
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
      .replace(/ /g, '-')
      .replace(/[^\一-龠\ぁ-ゔ\ァ-ヴー\w\.\-]+/g, '');
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
        str += this.faker.datatype.number(9);
      } else if (string.charAt(i) === '!') {
        str += this.faker.datatype.number({ min: 2, max: 9 });
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
        str += this.faker.datatype.number(9);
      } else if (string.charAt(i) === '?') {
        str += this.arrayElement(alpha);
      } else if (string.charAt(i) === '*') {
        str += this.faker.datatype.boolean()
          ? this.arrayElement(alpha)
          : this.faker.datatype.number(9);
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

    string = this.regexpStyleStringParse(string); // replace [4-9] with a random number in range etc...
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
   * @param string The template string to to parse.
   *
   * @example
   * faker.helpers.regexpStyleStringParse() // ''
   * faker.helpers.regexpStyleStringParse('#{5}') // '#####'
   * faker.helpers.regexpStyleStringParse('#{2,9}') // '#######'
   * faker.helpers.regexpStyleStringParse('[500-15000]') // '8375'
   * faker.helpers.regexpStyleStringParse('#{3}test[1-5]') // '###test3'
   *
   * @since 5.0.0
   */
  regexpStyleStringParse(string: string = ''): string {
    // Deal with range repeat `{min,max}`
    const RANGE_REP_REG = /(.)\{(\d+)\,(\d+)\}/;
    const REP_REG = /(.)\{(\d+)\}/;
    const RANGE_REG = /\[(\d+)\-(\d+)\]/;
    let min: number;
    let max: number;
    let tmp: number;
    let repetitions: number;
    let token = string.match(RANGE_REP_REG);
    while (token != null) {
      min = parseInt(token[2]);
      max = parseInt(token[3]);
      // switch min and max
      if (min > max) {
        tmp = max;
        max = min;
        min = tmp;
      }
      repetitions = this.faker.datatype.number({ min: min, max: max });
      string =
        string.slice(0, token.index) +
        token[1].repeat(repetitions) +
        string.slice(token.index + token[0].length);
      token = string.match(RANGE_REP_REG);
    }
    // Deal with repeat `{num}`
    token = string.match(REP_REG);
    while (token != null) {
      repetitions = parseInt(token[2]);
      string =
        string.slice(0, token.index) +
        token[1].repeat(repetitions) +
        string.slice(token.index + token[0].length);
      token = string.match(REP_REG);
    }
    // Deal with range `[min-max]` (only works with numbers for now)
    //TODO: implement for letters e.g. [0-9a-zA-Z] etc.

    token = string.match(RANGE_REG);
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
        this.faker.datatype.number({ min: min, max: max }).toString() +
        string.slice(token.index + token[0].length);
      token = string.match(RANGE_REG);
    }
    return string;
  }

  /**
   * Takes an array and randomizes it in place then returns it.
   *
   * Uses the modern version of the Fisher–Yates algorithm.
   *
   * @template T The type of the entries to shuffle.
   * @param o The array to shuffle. Defaults to `[]`.
   *
   * @example
   * faker.helpers.shuffle() // []
   * faker.helpers.shuffle(['a', 'b', 'c']) // [ 'b', 'c', 'a' ]
   *
   * @since 2.0.1
   */
  shuffle<T>(o?: T[]): T[] {
    if (o == null || o.length === 0) {
      return o || [];
    }

    for (let i = o.length - 1; i > 0; --i) {
      const j = this.faker.datatype.number(i);
      const x = o[i];
      o[i] = o[j];
      o[j] = x;
    }
    return o;
  }

  /**
   * Takes an array of strings or function that returns a string
   * and outputs a unique array of strings based on that source.
   * This method does not store the unique state between invocations.
   *
   * @template T The type of the entries.
   * @param source The strings to choose from or a function that generates a string.
   * @param length The number of elements to generate.
   *
   * @example
   * faker.helpers.uniqueArray(faker.random.word, 50)
   * faker.helpers.uniqueArray(faker.definitions.person.first_name, 6)
   * faker.helpers.uniqueArray(["Hello", "World", "Goodbye"], 2)
   *
   * @since 6.0.0
   */
  uniqueArray<T>(source: readonly T[] | (() => T), length: number): T[] {
    if (Array.isArray(source)) {
      const set = new Set<T>(source);
      const array = Array.from(set);
      return this.shuffle(array).splice(0, length);
    }
    const set = new Set<T>();
    try {
      if (typeof source === 'function') {
        while (set.size < length) {
          set.add(source());
        }
      }
    } catch {
      // Ignore
    }
    return Array.from(set);
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
   *   count: () => `${faker.datatype.number()}`,
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
      const value = data[p];
      if (typeof value === 'string') {
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
   * @template T The type of result of the given callback.
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
  maybe<T>(
    callback: () => T,
    options: { probability?: number } = {}
  ): T | undefined {
    const { probability = 0.5 } = options;
    if (this.faker.datatype.float({ min: 0, max: 1 }) < probability) {
      return callback();
    }
    return undefined;
  }

  /**
   * Returns a random key from given object or `undefined` if no key could be found.
   *
   * @param object The object to be used.
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
   * Returns a random value from given object or `undefined` if no key could be found.
   *
   * @param object The object to be used.
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
   * Returns random element from the given array.
   *
   * @template T The type of the entries to pick from.
   * @param array Array to pick the value from.
   *
   * @example
   * faker.helpers.arrayElement(['cat', 'dog', 'mouse']) // 'dog'
   *
   * @since 6.3.0
   */
  arrayElement<T = string>(
    // TODO @Shinigami92 2022-04-30: We want to remove this default value, but currently it's not possible because some definitions could be empty
    // See https://github.com/faker-js/faker/issues/893
    array: ReadonlyArray<T> = ['a', 'b', 'c'] as unknown as ReadonlyArray<T>
  ): T {
    const index =
      array.length > 1
        ? this.faker.datatype.number({ max: array.length - 1 })
        : 0;

    return array[index];
  }

  /**
   * Returns a subset with random elements of the given array in random order.
   *
   * @template T The type of the entries to pick from.
   * @param array Array to pick the value from.
   * @param count Number of elements to pick.
   *    When not provided, random number of elements will be picked.
   *    When value exceeds array boundaries, it will be limited to stay inside.
   *
   * @example
   * faker.helpers.arrayElements(['cat', 'dog', 'mouse']) // ['mouse', 'cat']
   * faker.helpers.arrayElements([1, 2, 3, 4, 5], 2) // [4, 2]
   *
   * @since 6.3.0
   */
  arrayElements<T>(
    // TODO @Shinigami92 2022-04-30: We want to remove this default value, but currently it's not possible because some definitions could be empty
    // See https://github.com/faker-js/faker/issues/893
    array: ReadonlyArray<T> = ['a', 'b', 'c'] as unknown as ReadonlyArray<T>,
    count?: number
  ): T[] {
    if (typeof count !== 'number') {
      count =
        array.length === 0
          ? 0
          : this.faker.datatype.number({ min: 1, max: array.length });
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
   * const hello = faker.helpers.fake('Hi, my name is {{person.firstName}} {{person.lastName}}!')
   * ```
   *
   * This would use the `faker.person.firstName()` and `faker.person.lastName()` method to resolve the placeholders respectively.
   *
   * It is also possible to provide parameters. At first, they will be parsed as json,
   * and if that isn't possible, we will fall back to string:
   *
   * ```js
   * const message = faker.helpers.fake('You can call me at {{phone.number(+!# !## #### #####!)}}.')
   * ```
   *
   * It is also possible to use multiple parameters (comma separated).
   *
   * ```js
   * const message = faker.helpers.fake('Your pin is {{string.numeric(4, {"allowLeadingZeros": true})}}.')
   * ```
   *
   * It is also NOT possible to use any non-faker methods or plain javascript in such templates.
   *
   * @param str The template string that will get interpolated. Must not be empty.
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
   * faker.helpers.fake('I rolled the dice and got: {{string.numeric(1, {"allowLeadingZeros": true})}}') // 'I rolled the dice and got: 6'
   *
   * @since 7.4.0
   */
  fake(str: string): string {
    // if incoming str parameter is not provided, return error message
    if (typeof str !== 'string' || str.length === 0) {
      throw new FakerError('string parameter is required!');
    }

    // find first matching {{ and }}
    const start = str.search(/{{[a-z]/);
    const end = str.indexOf('}}', start);

    // if no {{ and }} is found, we are done
    if (start === -1 || end === -1) {
      return str;
    }

    // extract method name from between the {{ }} that we found
    // for example: {{person.firstName}}
    const token = str.substring(start + 2, end + 2);
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
    let currentDefinitions: unknown = this.faker.definitions;

    // Search for the requested method or definition
    for (const part of parts) {
      currentModuleOrMethod = currentModuleOrMethod?.[part];
      currentDefinitions = currentDefinitions?.[part];
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
    } catch (err) {
      // since JSON.parse threw an error, assume parameters was actually a string
      params = [parameters];
    }

    const result = String(fn(...params));

    // Replace the found tag with the returned fake value
    // We cannot use string.replace here because the result might contain evaluated characters
    const res = str.substring(0, start) + result + str.substring(end + 2);

    if (res === '') {
      return '';
    }

    // return the response recursively until we are done finding all tags
    return this.fake(res);
  }

  /**
   * Generates a unique result using the results of the given method.
   * Used unique entries will be stored internally and filtered from subsequent calls.
   *
   * @template Method The type of the method to execute.
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
   * @example
   * faker.helpers.unique(faker.person.firstName) // 'Corbin'
   *
   * @since 7.5.0
   */
  unique<Method extends (...parameters) => RecordKey>(
    method: Method,
    args?: Parameters<Method>,
    options: {
      startTime?: number;
      maxTime?: number;
      maxRetries?: number;
      currentIterations?: number;
      exclude?: RecordKey | RecordKey[];
      compare?: (obj: Record<RecordKey, RecordKey>, key: RecordKey) => 0 | -1;
      store?: Record<RecordKey, RecordKey>;
    } = {}
  ): ReturnType<Method> {
    const { maxTime = 50, maxRetries = 50 } = options;
    return uniqueExec.exec(method, args, {
      ...options,
      startTime: new Date().getTime(),
      maxTime,
      maxRetries,
      currentIterations: 0,
    });
  }
}
