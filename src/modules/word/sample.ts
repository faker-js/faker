import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import type { LengthStrategyType, NumberOrRange } from '../../utils/types';
import { fakeHelpersShuffle } from '../helpers/shuffle';
import { fakeWordAdjective } from './adjective';
import { fakeWordAdverb } from './adverb';
import { fakeWordConjunction } from './conjunction';
import { fakeWordInterjection } from './interjection';
import { fakeWordNoun } from './noun';
import { fakeWordPreposition } from './preposition';
import { fakeWordVerb } from './verb';

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
 * @throws {FakerError} If no matching word data are available for the current locale.
 *
 * @example
 * fakeWordSample(fakerCore) // 'incidentally'
 * fakeWordSample(fakerCore, 5) // 'fruit'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeWordSample(
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
  const wordMethods = fakeHelpersShuffle(fakerCore, [
    fakeWordAdjective,
    fakeWordAdverb,
    fakeWordConjunction,
    fakeWordInterjection,
    fakeWordNoun,
    fakeWordPreposition,
    fakeWordVerb,
  ] satisfies Array<typeof fakeWordSample>);

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
