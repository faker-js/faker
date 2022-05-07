import type { Faker } from '../..';

/**
 * Filters a string array for values with a specific length.
 * If length is not provided or no values with this length there found a copy of the original array is returned.
 *
 * @param options The options to provide
 * @param options.wordList A list of word to filter
 * @param options.length The exact length words should have
 */
function filterWordListByLength(options: {
  wordList: string[];
  length?: number;
}): string[] {
  if (!options.length) {
    return options.wordList;
  }

  const wordListWithLengthFilter = options.wordList.filter(
    (word) => word.length === options.length
  );

  return wordListWithLengthFilter.length > 0
    ? wordListWithLengthFilter
    : [...options.wordList];
}

/**
 * Module to return various types of words.
 */
export class WordModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(WordModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns an adjective of random or optionally specified length.
   *
   * @param length Expected adjective length. If specified length is unresolvable, returns adjective of a random length.
   *
   * @example
   * faker.word.adjective() // 'pungent'
   * faker.word.adjective(5) // 'slimy'
   * faker.word.adjective(100) // 'complete'
   */
  adjective(length?: number): string {
    return this.faker.helpers.arrayElement(
      filterWordListByLength({
        wordList: this.faker.definitions.word.adjective,
        length,
      })
    );
  }

  /**
   * Returns an adverb of random or optionally specified length.
   *
   * @param length Expected adverb length. If specified length is unresolvable, returns adverb of a random length.
   *
   * @example
   * faker.word.adverb() // 'quarrelsomely'
   * faker.word.adverb(5) // 'madly'
   * faker.word.adverb(100) // 'sadly'
   */
  adverb(length?: number): string {
    return this.faker.helpers.arrayElement(
      filterWordListByLength({
        wordList: this.faker.definitions.word.adverb,
        length,
      })
    );
  }

  /**
   * Returns a conjunction of random or optionally specified length.
   *
   * @param length Expected conjunction length. If specified length is unresolvable, returns conjunction of a random length.
   *
   * @example
   * faker.word.conjunction() // 'in order that'
   * faker.word.conjunction(5) // 'since'
   * faker.word.conjunction(100) // 'as long as'
   */
  conjunction(length?: number): string {
    return this.faker.helpers.arrayElement(
      filterWordListByLength({
        wordList: this.faker.definitions.word.conjunction,
        length,
      })
    );
  }

  /**
   * Returns an interjection of random or optionally specified length.
   *
   * @param length Expected interjection length. If specified length is unresolvable, returns interjection of a random length.
   *
   * @example
   * faker.word.interjection() // 'gah'
   * faker.word.interjection(5) // 'fooey'
   * faker.word.interjection(100) // 'yowza'
   */
  interjection(length?: number): string {
    return this.faker.helpers.arrayElement(
      filterWordListByLength({
        wordList: this.faker.definitions.word.interjection,
        length,
      })
    );
  }

  /**
   * Returns a noun of random or optionally specified length.
   *
   * @param length Expected noun length. If specified length is unresolvable, returns noun of a random length.
   *
   * @example
   * faker.word.noun() // 'external'
   * faker.word.noun(5) // 'front'
   * faker.word.noun(100) // 'care'
   */
  noun(length?: number): string {
    return this.faker.helpers.arrayElement(
      filterWordListByLength({
        wordList: this.faker.definitions.word.noun,
        length,
      })
    );
  }

  /**
   * Returns a preposition of random or optionally specified length.
   *
   * @param length Expected preposition length. If specified length is unresolvable, returns preposition of a random length.
   *
   * @example
   * faker.word.preposition() // 'without'
   * faker.word.preposition(5) // 'abaft'
   * faker.word.preposition(100) // 'an'
   */
  preposition(length?: number): string {
    return this.faker.helpers.arrayElement(
      filterWordListByLength({
        wordList: this.faker.definitions.word.preposition,
        length,
      })
    );
  }

  /**
   * Returns a verb of random or optionally specified length.
   *
   * @param length Expected verb length. If specified length is unresolvable, returns verb of a random length.
   *
   * @example
   * faker.word.verb() // 'act'
   * faker.word.verb(5) // 'tinge'
   * faker.word.verb(100) // 'mess'
   */
  verb(length?: number): string {
    return this.faker.helpers.arrayElement(
      filterWordListByLength({
        wordList: this.faker.definitions.word.verb,
        length,
      })
    );
  }
}
