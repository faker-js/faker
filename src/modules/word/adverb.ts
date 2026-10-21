import type { FakerCore } from '../../core';
import type { LengthStrategyType, NumberOrRange } from '../../utils/types';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { filterWordListByLength } from './_filter-word-list-by-length';

/**
 * Returns a random adverb.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The expected length of the word or the options to use.
 * @param options.length The expected length of the word.
 * @param options.strategy The strategy to apply when no words with a matching length are found.
 *
 * Defaults to `'fail'`.
 *
 * @example
 * fakeWordAdverb(fakerCore) // 'quarrelsomely'
 * fakeWordAdverb(fakerCore, 5) // 'madly'
 * fakeWordAdverb(fakerCore, { strategy: 'shortest' }) // 'too'
 * fakeWordAdverb(fakerCore, { length: { min: 5, max: 7 }, strategy: "fail" }) // 'sweetly'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeWordAdverb(
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
      wordList: fakerCore.locale.word.adverb,
    })
  );
}
