import type { Faker } from '.';

function selectWords(length?: number, words: string[] = []): string[] {
  let wordList = words;
  if (length) {
    wordList = words.filter((word) => word.length === length);
    if (wordList.length === 0) {
      wordList = words;
    }
  }

  return wordList;
}

/**
 * Module to return various types of words.
 */
export class Word {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Word.prototype)) {
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
    return this.faker.random.arrayElement(
      selectWords(length, this.faker.definitions.word.adjective)
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
    return this.faker.random.arrayElement(
      selectWords(length, this.faker.definitions.word.adverb)
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
    return this.faker.random.arrayElement(
      selectWords(length, this.faker.definitions.word.conjunction)
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
    return this.faker.random.arrayElement(
      selectWords(length, this.faker.definitions.word.interjection)
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
    return this.faker.random.arrayElement(
      selectWords(length, this.faker.definitions.word.noun)
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
    return this.faker.random.arrayElement(
      selectWords(length, this.faker.definitions.word.preposition)
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
    return this.faker.random.arrayElement(
      selectWords(length, this.faker.definitions.word.verb)
    );
  }
}
