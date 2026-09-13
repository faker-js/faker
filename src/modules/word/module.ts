import { ModuleBase } from '../../internal/module-base';
import type { LengthStrategyType, NumberOrRange } from '../../utils/types';
import { adjective as wordAdjective } from './adjective';
import { adverb as wordAdverb } from './adverb';
import { conjunction as wordConjunction } from './conjunction';
import { interjection as wordInterjection } from './interjection';
import { noun as wordNoun } from './noun';
import { preposition as wordPreposition } from './preposition';
import { wordSample } from './sample';
import { verb as wordVerb } from './verb';
import { words as wordWords } from './words';

/**
 * Module to return various types of words.
 */
export class WordModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree word' to update the methods from their respective files.
   */

  /**
   * Returns a random adjective.
   *
   * @param options The expected length of the word or the options to use.
   * @param options.length The expected length of the word.
   * @param options.strategy The strategy to apply when no words with a matching length are found.
   *
   * Defaults to `'fail'`.
   *
   * @example
   * faker.word.adjective() // 'pungent'
   * faker.word.adjective(5) // 'slimy'
   * faker.word.adjective({ strategy: 'shortest' }) // 'icy'
   * faker.word.adjective({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'distant'
   *
   * @since 6.0.0
   */
  adjective(
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
    return wordAdjective(this.faker.fakerCore, options);
  }

  /**
   * Returns a random adverb.
   *
   * @param options The expected length of the word or the options to use.
   * @param options.length The expected length of the word.
   * @param options.strategy The strategy to apply when no words with a matching length are found.
   *
   * Defaults to `'fail'`.
   *
   * @example
   * faker.word.adverb() // 'quarrelsomely'
   * faker.word.adverb(5) // 'madly'
   * faker.word.adverb({ strategy: 'shortest' }) // 'too'
   * faker.word.adverb({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'sweetly'
   *
   * @since 6.0.0
   */
  adverb(
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
    return wordAdverb(this.faker.fakerCore, options);
  }

  /**
   * Returns a random conjunction.
   *
   * @param options The expected length of the word or the options to use.
   * @param options.length The expected length of the word.
   * @param options.strategy The strategy to apply when no words with a matching length are found.
   *
   * Defaults to `'fail'`.
   *
   * @example
   * faker.word.conjunction() // 'in order that'
   * faker.word.conjunction(5) // 'since'
   * faker.word.conjunction({ strategy: 'shortest' }) // 'or'
   * faker.word.conjunction({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'hence'
   *
   * @since 6.0.0
   */
  conjunction(
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
    return wordConjunction(this.faker.fakerCore, options);
  }

  /**
   * Returns a random interjection.
   *
   * @param options The expected length of the word or the options to use.
   * @param options.length The expected length of the word.
   * @param options.strategy The strategy to apply when no words with a matching length are found.
   *
   * Defaults to `'fail'`.
   *
   * @example
   * faker.word.interjection() // 'gah'
   * faker.word.interjection(5) // 'fooey'
   * faker.word.interjection({ strategy: 'shortest' }) // 'hm'
   * faker.word.interjection({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'boohoo'
   *
   * @since 6.0.0
   */
  interjection(
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
    return wordInterjection(this.faker.fakerCore, options);
  }

  /**
   * Returns a random noun.
   *
   * @param options The expected length of the word or the options to use.
   * @param options.length The expected length of the word.
   * @param options.strategy The strategy to apply when no words with a matching length are found.
   *
   * Defaults to `'fail'`.
   *
   * @example
   * faker.word.noun() // 'external'
   * faker.word.noun(5) // 'front'
   * faker.word.noun({ strategy: 'shortest' }) // 'ad'
   * faker.word.noun({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'average'
   *
   * @since 6.0.0
   */
  noun(
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
    return wordNoun(this.faker.fakerCore, options);
  }

  /**
   * Returns a random preposition.
   *
   * @param options The expected length of the word or the options to use.
   * @param options.length The expected length of the word.
   * @param options.strategy The strategy to apply when no words with a matching length are found.
   *
   * Defaults to `'fail'`.
   *
   * @example
   * faker.word.preposition() // 'without'
   * faker.word.preposition(5) // 'abaft'
   * faker.word.preposition({ strategy: 'shortest' }) // 'a'
   * faker.word.preposition({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'given'
   *
   * @since 6.0.0
   */
  preposition(
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
    return wordPreposition(this.faker.fakerCore, options);
  }

  /**
   * Returns a random verb.
   *
   * @param options The expected length of the word or the options to use.
   * @param options.length The expected length of the word.
   * @param options.strategy The strategy to apply when no words with a matching length are found.
   *
   * Defaults to `'fail'`.
   *
   * @example
   * faker.word.verb() // 'act'
   * faker.word.verb(5) // 'tinge'
   * faker.word.verb({ strategy: 'shortest' }) // 'do'
   * faker.word.verb({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'vault'
   *
   * @since 6.0.0
   */
  verb(
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
    return wordVerb(this.faker.fakerCore, options);
  }

  /**
   * Returns a random word, that can be an adjective, adverb, conjunction, interjection, noun, preposition, or verb.
   *
   * @param options The expected length of the word or the options to use.
   * @param options.length The expected length of the word.
   * @param options.strategy The strategy to apply when no words with a matching length are found.
   *
   * Defaults to `'fail'`.
   *
   * @example
   * faker.word.sample() // 'incidentally'
   * faker.word.sample(5) // 'fruit'
   *
   * @since 8.0.0
   */
  sample(
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
    return wordSample(this.faker.fakerCore, options);
  }

  /**
   * Returns a random string containing some words separated by spaces.
   *
   * @param options The optional options object or the number of words to return.
   * @param options.count The number of words to return. Defaults to a random value between `1` and `3`.
   *
   * @example
   * faker.word.words() // 'almost'
   * faker.word.words(5) // 'before hourly patiently dribble equal'
   * faker.word.words({ count: 5 }) // 'whoever edible um kissingly faraway'
   * faker.word.words({ count: { min: 5, max: 10 } }) // 'vice buoyant through apropos poised total wary boohoo'
   *
   * @since 8.0.0
   */
  words(
    options:
      | number
      | {
          /**
           * The number of words to return.
           *
           * @default { min: 1, max: 3 }
           */
          count?: NumberOrRange;
        } = {}
  ): string {
    return wordWords(this.faker.fakerCore, options);
  }
}
