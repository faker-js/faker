import type { Faker } from '.';

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
   * If specified length is unresolvable, returns random adjective.
   *
   * @param length length of word to return
   */
  adjective(length?: number): string {
    let wordList = this.faker.definitions.word.adjective;
    if (length) {
      wordList = this.faker.definitions.word.adjective.filter(
        (word) => word.length == length
      );
    }

    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      this.faker.random.arrayElement(wordList) ||
      this.faker.random.arrayElement(this.faker.definitions.word.adjective)
    );
  }

  /**
   * Returns an adverb of random or optionally specified length.
   * If specified length is unresolvable, returns random adverb.
   *
   * @param length length of word to return
   */
  adverb(length?: number): string {
    let wordList = this.faker.definitions.word.adverb;
    if (length) {
      wordList = this.faker.definitions.word.adverb.filter(
        (word: string) => word.length == length
      );
    }

    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      this.faker.random.arrayElement(wordList) ||
      this.faker.random.arrayElement(this.faker.definitions.word.adverb)
    );
  }

  /**
   * Returns a conjunction of random or optionally specified length.
   * If specified length is unresolvable, returns random conjunction.
   *
   * @param length length of word to return
   */
  conjunction(length?: number): string {
    let wordList = this.faker.definitions.word.conjunction;
    if (length) {
      wordList = this.faker.definitions.word.conjunction.filter(
        (word: string) => word.length == length
      );
    }

    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      this.faker.random.arrayElement(wordList) ||
      this.faker.random.arrayElement(this.faker.definitions.word.conjunction)
    );
  }

  /**
   * Returns an interjection of random or optionally specified length.
   * If specified length is unresolvable, returns random interjection.
   *
   * @param length length of word to return
   */
  interjection(length?: number): string {
    let wordList = this.faker.definitions.word.interjection;
    if (length) {
      wordList = this.faker.definitions.word.interjection.filter(
        (word: string) => word.length == length
      );
    }

    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      this.faker.random.arrayElement(wordList) ||
      this.faker.random.arrayElement(this.faker.definitions.word.interjection)
    );
  }

  /**
   * Returns a noun of random or optionally specified length.
   * If specified length is unresolvable, returns random noun.
   *
   * @param length length of word to return
   */
  noun(length?: number): string {
    let wordList = this.faker.definitions.word.noun;
    if (length) {
      wordList = this.faker.definitions.word.noun.filter(
        (word: string) => word.length == length
      );
    }

    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      this.faker.random.arrayElement(wordList) ||
      this.faker.random.arrayElement(this.faker.definitions.word.noun)
    );
  }

  /**
   * Returns a preposition of random or optionally specified length.
   * If specified length is unresolvable, returns random preposition.
   *
   * @param length length of word to return
   */
  preposition(length?: number): string {
    let wordList = this.faker.definitions.word.preposition;
    if (length) {
      wordList = this.faker.definitions.word.preposition.filter(
        (word: string) => word.length == length
      );
    }

    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      this.faker.random.arrayElement(wordList) ||
      this.faker.random.arrayElement(this.faker.definitions.word.preposition)
    );
  }

  /**
   * Returns a verb of random or optionally specified length.
   * If specified length is unresolvable, returns random verb.
   *
   * @param length length of word to return
   */
  verb(length?: number): string {
    let wordList = this.faker.definitions.word.verb;
    if (length) {
      wordList = this.faker.definitions.word.verb.filter(
        (word: string) => word.length == length
      );
    }

    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      this.faker.random.arrayElement(wordList) ||
      this.faker.random.arrayElement(this.faker.definitions.word.verb)
    );
  }
}
