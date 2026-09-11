import type { FakerCore } from '../../core';
import type { LengthStrategyType, NumberOrRange } from '../../utils/types';
import { arrayElement } from '../helpers/array-element';
import { filterWordListByLength } from '../word/_filter-word-list-by-length';

/**
 * Generates a word of a specified length.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The expected length of the word or the options to use.
 * @param options.length The expected length of the word.
 * @param options.strategy The strategy to apply when no words with a matching length are found. Defaults to `'fail'`.
 *
 * @example
 * word(fakerCore) // 'temporibus'
 * word(fakerCore, 5) // 'velit'
 * word(fakerCore, { strategy: 'shortest' }) // 'a'
 * word(fakerCore, { length: { min: 5, max: 7 }, strategy: 'fail' }) // 'quaerat'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function word(
  fakerCore: FakerCore,
  options:
    | number
    | {
        /**
         * The expected length of the word.
         *
         * If not provided, a word of any length is returned.
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

  return arrayElement(
    fakerCore,
    filterWordListByLength({
      ...options,
      wordList: fakerCore.locale.lorem.word,
    })
  );
}
