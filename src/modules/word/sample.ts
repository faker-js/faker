import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import type { LengthStrategyType, NumberOrRange } from '../../utils/types';
import { shuffle } from '../helpers/shuffle';

/**
 * Returns a random word, that can be an adjective, adverb, conjunction, interjection, noun, preposition, or verb.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The expected length of the word or the options to use.
 * @param options.length The expected length of the word.
 * @param options.strategy The strategy to apply when no words with a matching length are found.
 *
 * Defaults to `'fail'`.
 *
 * @example
 * wordSample(fakerCore) // 'incidentally'
 * wordSample(fakerCore, 5) // 'fruit'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function wordSample(
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
  const wordMethods = shuffle(fakerCore, [
    this.adjective,
    this.adverb,
    this.conjunction,
    this.interjection,
    this.noun,
    this.preposition,
    this.verb,
  ]);

  for (const randomWordMethod of wordMethods) {
    try {
      return randomWordMethod(options);
    } catch {
      // catch missing locale data potentially required by randomWordMethod
      continue;
    }
  }

  throw new FakerError(
    'No matching word data available for the current locale'
  );
}
