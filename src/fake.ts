import type { Faker } from '.';

/**
 * Generator method for combining faker methods based on string input
 */
export class Fake {
  constructor(private readonly faker: Faker) {}

  /**
   * Generator method for combining faker methods based on string input
   *
   * __Example:__
   *
   * ```
   * console.log(faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'));
   * // outputs: "Marks, Dean Sr."
   * ```
   *
   * This will interpolate the format string with the value of methods
   * [name.lastName]{@link faker.name.lastName}, [name.firstName]{@link faker.name.firstName},
   * and [name.suffix]{@link faker.name.suffix}
   *
   * @method faker.fake
   * @param str
   */
  fake(str: string) {
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
    const fn = this.faker[parts[0]][parts[1]];

    // If parameters are populated here, they are always going to be of string type
    // since we might actually be dealing with an object or array,
    // we always attempt to the parse the incoming parameters into JSON
    let params: any;
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
      result = fn.call(this);
    } else {
      result = fn.call(this, params);
    }

    // replace the found tag with the returned fake value
    res = str.replace('{{' + token + '}}', result);

    // return the response recursively until we are done finding all tags
    return this.fake(res);
  }
}
