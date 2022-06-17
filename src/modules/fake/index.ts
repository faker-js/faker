import type { Faker } from '../..';
import { FakerError } from '../../errors/faker-error';

/**
 * Generator method for combining faker methods based on string input.
 */
export class Fake {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Fake.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generator for combining faker methods based on a static string input.
   *
   * Note: We recommend using string template literals instead of `fake()`,
   * which are faster and strongly typed (if you are using TypeScript),
   * e.g. ``const address = `${faker.address.zipCode()} ${faker.address.city()}`;``
   *
   * This method is useful if you have to build a random string from a static, non-executable source
   * (e.g. string coming from a user, stored in a database or a file).
   *
   * It checks the given string for placeholders and replaces them by calling faker methods:
   *
   * ```js
   * const hello = faker.fake('Hi, my name is {{name.firstName}} {{name.lastName}}!')
   * ```
   *
   * This would use the `faker.name.firstName()` and `faker.name.lastName()` method to resolve the placeholders respectively.
   *
   * It is also possible to provide parameters. At first, they will be parsed as json,
   * and if that isn't possible, we will fall back to string:
   *
   * ```js
   * const message = faker.fake(`You can call me at {{phone.number(+!# !## #### #####!)}}.')
   * ```
   *
   * Currently it is not possible to set more than a single parameter.
   *
   * It is also NOT possible to use any non-faker methods or plain javascript in such templates.
   *
   * @param str The template string that will get interpolated. Must not be empty.
   *
   * @see faker.helpers.mustache() to use custom functions for resolution.
   *
   * @example
   * faker.fake('{{name.lastName}}') // 'Barrows'
   * faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}') // 'Durgan, Noe MD'
   * faker.fake('This is static test.') // 'This is static test.'
   * faker.fake('Good Morning {{name.firstName}}!') // 'Good Morning Estelle!'
   * faker.fake('You can call me at {{phone.number(!## ### #####!)}}.') // 'You can call me at 202 555 973722.'
   * faker.fake('I flipped the coin an got: {{helpers.arrayElement(["heads", "tails"])}}') // 'I flipped the coin an got: tails'
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
    // for example: {{name.firstName}}
    const token = str.substring(start + 2, end + 2);
    let method = token.replace('}}', '').replace('{{', '');

    // extract method parameters
    const regExp = /\(([^)]+)\)/;
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
    let fn: (args?: unknown) => unknown;
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
    let params: unknown;
    // Note: we experience a small performance hit here due to JSON.parse try / catch
    // If anyone actually needs to optimize this specific code path, please open a support issue on github
    try {
      params = JSON.parse(parameters);
    } catch (err) {
      // since JSON.parse threw an error, assume parameters was actually a string
      params = parameters;
    }

    let result: string;
    if (typeof params === 'string' && params.length === 0) {
      result = String(fn());
    } else {
      result = String(fn(params));
    }

    // Replace the found tag with the returned fake value
    // We cannot use string.replace here because the result might contain evaluated characters
    const res = str.substring(0, start) + result + str.substring(end + 2);

    if (res === '') {
      return '';
    }

    // return the response recursively until we are done finding all tags
    return this.fake(res);
  }
}
