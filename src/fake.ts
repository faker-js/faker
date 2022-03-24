import type { Faker } from '.';

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
   * Generator method for combining faker methods based on string input.
   *
   * This will check the given string for placeholders and replace them by calling the specified faker method.
   * E.g. the input `Hi, my name is {{name.firstName}}!`,
   * will use the `faker.name.firstName()` method to resolve the placeholder.
   * It is also possible to combine static text with placeholders,
   * since only the parts inside the double braces `{{placeholder}}` are replaced.
   * The replacement process is repeated until all placeholders have been replaced by static text.
   * It is also possible to provide the called method with additional parameters by adding parentheses.
   * This method will first attempt to parse the parameters as json, if that isn't possible it will use them as string.
   * E.g. `You can call me at {{phone.phoneNumber(+!# !## #### #####!)}}.`
   * Currently it isn't possible to set more than a single parameter this way.
   *
   * Please note that is NOT possible to use any non-faker methods or plain js script in there.
   *
   * @param str The format string that will get interpolated. May not be empty.
   *
   * @see faker.helpers.mustache() to use custom functions for resolution.
   *
   * @example
   * faker.fake('{{name.lastName}}') // 'Barrows'
   * faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}') // 'Durgan, Noe MD'
   * faker.fake('This is static test.') // 'This is static test.'
   * faker.fake('Good Morning {{name.firstName}}!') // 'Good Morning Estelle!'
   * faker.fake('You can call me at {{phone.phoneNumber(!## ### #####!)}}.') // 'You can call me at 202 555 973722.'
   * faker.fake('I flipped the coin an got: {{random.arrayElement(["heads", "tails"])}}') // 'I flipped the coin an got: tails'
   */
  fake(str: string): string {
    // setup default response as empty string
    let res = '';

    // if incoming str parameter is not provided, return error message
    if (typeof str !== 'string' || str.length === 0) {
      throw new Error('string parameter is required!');
    }

    // find first matching {{ and }}
    const start = str.search('{{');
    const end = str.search('}}');

    // if no {{ and }} is found, we are done
    if (start === -1 || end === -1) {
      return str;
    }

    // console.log('attempting to parse', str);

    // extract method name from between the {{ }} that we found
    // for example: {{name.firstName}}
    const token = str.substr(start + 2, end - start - 2);
    let method = token.replace('}}', '').replace('{{', '');

    // console.log('method', method)

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

    if (typeof this.faker[parts[0]] === 'undefined') {
      throw new Error('Invalid module: ' + parts[0]);
    }

    if (typeof this.faker[parts[0]][parts[1]] === 'undefined') {
      throw new Error('Invalid method: ' + parts[0] + '.' + parts[1]);
    }

    // assign the function from the module.function namespace
    let fn: (args?: unknown) => string = this.faker[parts[0]][parts[1]];
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
      result = fn();
    } else {
      result = fn(params);
    }

    // replace the found tag with the returned fake value
    res = str.replace('{{' + token + '}}', result);

    if (res === '') {
      return '';
    }

    // return the response recursively until we are done finding all tags
    return this.fake(res);
  }
}
