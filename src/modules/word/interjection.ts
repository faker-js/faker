import type { FakerCore } from '../../core';
import type { LengthStrategyType, NumberOrRange } from '../../utils/types';
import { helpersArrayElement } from '../helpers/array-element';
import { filterWordListByLength } from './_filter-word-list-by-length';

/**
 * Returns a random interjection.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The expected length of the word or the options to use.
 * @param options.length The expected length of the word.
 * @param options.strategy The strategy to apply when no words with a matching length are found.
 *
 * Defaults to `'fail'`.
 *
 * @example
 * wordInterjection(fakerCore) // 'gah'
 * wordInterjection(fakerCore, 5) // 'fooey'
 * wordInterjection(fakerCore, { strategy: 'shortest' }) // 'hm'
 * wordInterjection(fakerCore, { length: { min: 5, max: 7 }, strategy: "fail" }) // 'boohoo'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function wordInterjection(
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
      wordList: fakerCore.locale.word.interjection,
    })
  );
}
