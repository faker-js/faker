import type { FakerCore } from '../../core';
import type { LengthStrategyType, NumberOrRange } from '../../utils/types';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { filterWordListByLength } from './_filter-word-list-by-length';

/**
 * Returns a random preposition.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The expected length of the word or the options to use.
 * @param options.length The expected length of the word.
 * @param options.strategy The strategy to apply when no words with a matching length are found.
 *
 * Defaults to `'fail'`.
 *
 * @example
 * fakeWordPreposition(fakerCore) // 'without'
 * fakeWordPreposition(fakerCore, 5) // 'abaft'
 * fakeWordPreposition(fakerCore, { strategy: 'shortest' }) // 'a'
 * fakeWordPreposition(fakerCore, { length: { min: 5, max: 7 }, strategy: "fail" }) // 'given'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeWordPreposition(
  fakerCore: FakerCore,
  options:
    | number
    | {
        /**
         * The expected length of the word.
         */
        length?: NumberOrRange;
        /**
         * The strategy to apply when no words with a matching length are found.
         *
         * @default 'fail'
         */
        strategy?: LengthStrategyType;
      } = {}
): string {
  if (typeof options === 'number') {
    options = { length: options };
  }

  return fakeHelpersArrayElement(
    fakerCore,
    filterWordListByLength({
      ...options,
      wordList: fakerCore.locale.word.preposition,
    })
  );
}
