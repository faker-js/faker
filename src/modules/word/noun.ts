import type { FakerCore } from '../../core';
import type { LengthStrategyType, NumberOrRange } from '../../utils/types';
import { helpersArrayElement } from '../helpers/array-element';
import { filterWordListByLength } from './_filter-word-list-by-length';

/**
 * Returns a random noun.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The expected length of the word or the options to use.
 * @param options.length The expected length of the word.
 * @param options.strategy The strategy to apply when no words with a matching length are found.
 *
 * Defaults to `'fail'`.
 *
 * @example
 * wordNoun(fakerCore) // 'external'
 * wordNoun(fakerCore, 5) // 'front'
 * wordNoun(fakerCore, { strategy: 'shortest' }) // 'ad'
 * wordNoun(fakerCore, { length: { min: 5, max: 7 }, strategy: "fail" }) // 'average'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function wordNoun(
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

  return helpersArrayElement(
    fakerCore,
    filterWordListByLength({
      ...options,
      wordList: fakerCore.locale.word.noun,
    })
  );
}
