import { SimpleModuleBase } from '../../internal/module-base';

/**
 * Module to generate boolean values.
 *
 * ### Overview
 *
 * For a simple random true or false value, use [`boolean()`](https://fakerjs.dev/api/datatype.html#boolean).
 */
export class DatatypeModule extends SimpleModuleBase {
  /**
   * Returns the boolean value true or false.
   *
   * **Note:**
   * A probability of `0.75` results in `true` being returned `75%` of the calls; likewise `0.3` => `30%`.
   * If the probability is `<= 0.0`, it will always return `false`.
   * If the probability is `>= 1.0`, it will always return `true`.
   * The probability is limited to two decimal places.
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
    if (typeof options === 'number') {
      options = {
        probability: options,
      };
    }

    const { probability = 0.5 } = options;
    if (probability <= 0) {
      return false;
    }

    if (probability >= 1) {
      // This check is required to avoid returning false when float() returns 1
      return true;
    }

    return this.faker.number.float() < probability;
  }
}
