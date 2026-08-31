import type { FakerCore } from '../../core';
import { float } from '../number/float';

/**
 * Returns the boolean value true or false.
 *
 * **Note:**
 * A probability of `0.75` results in `true` being returned `75%` of the calls; likewise `0.3` => `30%`.
 * If the probability is `<= 0.0`, it will always return `false`.
 * If the probability is `>= 1.0`, it will always return `true`.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object or the probability (`[0.00, 1.00]`) of returning `true`.
 * @param options.probability The probability (`[0.00, 1.00]`) of returning `true`. Defaults to `0.5`.
 *
 * @example
 * boolean(fakerCore) // false
 * boolean(fakerCore, 0.9) // true
 * boolean(fakerCore, { probability: 0.1 }) // false
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function boolean(
  fakerCore: FakerCore,
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

  return float(fakerCore) < probability;
}
