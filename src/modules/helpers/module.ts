import type { FakerCore } from '../../core';
import type { Faker } from '../../faker';
import { fakeEval } from './_eval';
import { SimpleHelpersModule } from './simple-module';

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

  constructor(
    protected readonly fakerCore: FakerCore,
    private readonly faker: Faker
  ) {
    super(fakerCore);
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
   * ```ts
   * const hello = faker.helpers.fake('Hi, my name is {{person.firstName}} {{person.lastName}}!');
   * ```
   *
   * This would use the `faker.person.firstName()` and `faker.person.lastName()` method to resolve the placeholders respectively.
   *
   * It is also possible to provide parameters. At first, they will be parsed as json,
   * and if that isn't possible, we will fall back to string:
   *
   * ```ts
   * const message = faker.helpers.fake('You can call me at {{phone.number(+!# !## #### #####!)}}.');
   * ```
   *
   * It is also possible to use multiple parameters (comma separated).
   *
   * ```ts
   * const message = faker.helpers.fake('Your pin is {{string.numeric(4, {"allowLeadingZeros": true})}}.');
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
   * ```ts
   * const hello = faker.helpers.fake(['Hi, my name is {{person.firstName}} {{person.lastName}}!']);
   * ```
   *
   * This would use the `faker.person.firstName()` and `faker.person.lastName()` method to resolve the placeholders respectively.
   *
   * It is also possible to provide parameters. At first, they will be parsed as json,
   * and if that isn't possible, it will fall back to string:
   *
   * ```ts
   * const message = faker.helpers.fake([
   *   'You can call me at {{phone.number(+!# !## #### #####!)}}.',
   *   'My email is {{internet.email}}.',
   * ]);
   * ```
   *
   * It is also possible to use multiple parameters (comma separated).
   *
   * ```ts
   * const message = faker.helpers.fake(['Your pin is {{string.numeric(4, {"allowLeadingZeros": true})}}.']);
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
   * ```ts
   * const hello = faker.helpers.fake('Hi, my name is {{person.firstName}} {{person.lastName}}!');
   * ```
   *
   * This would use the `faker.person.firstName()` and `faker.person.lastName()` method to resolve the placeholders respectively.
   *
   * It is also possible to provide parameters. At first, they will be parsed as json,
   * and if that isn't possible, it will fall back to string:
   *
   * ```ts
   * const message = faker.helpers.fake('You can call me at {{phone.number(+!# !## #### #####!)}}.');
   * ```
   *
   * It is also possible to use multiple parameters (comma separated).
   *
   * ```ts
   * const message = faker.helpers.fake('Your pin is {{string.numeric(4, {"allowLeadingZeros": true})}}.');
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
