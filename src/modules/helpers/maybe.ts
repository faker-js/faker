import type { FakerCore } from '../../core';
import { boolean } from '../datatype/boolean';

/**
 * Returns the result of the callback if the probability check was successful, otherwise `undefined`.
 *
 * @template TResult The type of result of the given callback.
 *
 * @param fakerCore The FakerCore to use.
 * @param callback The callback that will be invoked if the probability check was successful.
 * @param options The options to use.
 * @param options.probability The probability (`[0.00, 1.00]`) of the callback being invoked. Defaults to `0.5`.
 *
 * @example
 * maybe(fakerCore, () => 'Hello World!') // 'Hello World!'
 * maybe(fakerCore, () => 'Hello World!', { probability: 0.1 }) // undefined
 * maybe(fakerCore, () => 'Hello World!', { probability: 0.9 }) // 'Hello World!'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function maybe<TResult>(
  fakerCore: FakerCore,
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
  if (boolean(fakerCore, options)) {
    return callback();
  }

  return undefined;
}
