import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import type { LengthStrategyType, NumberOrRange } from '../../utils/types';
import { helpersShuffle } from '../helpers/shuffle';
import { wordAdjective } from './adjective';
import { wordAdverb } from './adverb';
import { wordConjunction } from './conjunction';
import { wordInterjection } from './interjection';
import { wordNoun } from './noun';
import { wordPreposition } from './preposition';
import { wordVerb } from './verb';

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
  const wordMethods = helpersShuffle(fakerCore, [
    wordAdjective,
    wordAdverb,
    wordConjunction,
    wordInterjection,
    wordNoun,
    wordPreposition,
    wordVerb,
  ] satisfies Array<typeof wordSample>);

  for (const randomWordMethod of wordMethods) {
    try {
      return randomWordMethod(fakerCore, options);
    } catch {
      // catch missing locale data potentially required by randomWordMethod
      continue;
    }
  }

  throw new FakerError(
    'No matching word data available for the current locale'
  );
}
