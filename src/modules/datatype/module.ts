import { SimpleModuleBase } from '../../internal/module-base';
import { boolean as datatypeBoolean } from './boolean';

/**
 * Module to generate boolean values.
 *
 * ### Overview
 *
 * For a simple random true or false value, use [`boolean()`](https://fakerjs.dev/api/datatype.html#boolean).
 */
export class DatatypeModule extends SimpleModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree datatype' to update the methods from their respective files.
   */

  /**
   * Returns the boolean value true or false.
   *
   * **Note:**
   * A probability of `0.75` results in `true` being returned `75%` of the calls; likewise `0.3` => `30%`.
   * If the probability is `<= 0.0`, it will always return `false`.
   * If the probability is `>= 1.0`, it will always return `true`.
   *
   * @param options The optional options object or the probability (`[0.00, 1.00]`) of returning `true`.
   * @param options.probability The probability (`[0.00, 1.00]`) of returning `true`. Defaults to `0.5`.
   *
   * @example
   * faker.datatype.boolean() // false
   * faker.datatype.boolean(0.9) // true
   * faker.datatype.boolean({ probability: 0.1 }) // false
   *
   * @since 5.5.0
   */
  boolean(
    options:
      | number
      | {
          /**
           * The probability (`[0.00, 1.00]`) of returning `true`.
           *
           * @default 0.5
           */
          probability?: number;
        } = {}
  ): boolean {
    return datatypeBoolean(this.faker.fakerCore, options);
  }
}
