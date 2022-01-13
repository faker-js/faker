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
   * @method faker.word.adjective
   * @param {number} [length] - optional length of word to return
   * @returns {string}          a random adjective
   */
  adjective(length?: number): string {
    var wordList = this.faker.definitions.word.adjective;
    if (length) {
      wordList = this.faker.definitions.word.adjective.filter(function (
        word: string
      ) {
        return word.length == length;
      });
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
   * @method faker.word.adverb
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random adverb
   */
  adverb(length?: number): string {
    var wordList = this.faker.definitions.word.adverb;
    if (length) {
      wordList = this.faker.definitions.word.adverb.filter(function (word) {
        return word.length == length;
      });
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
   * @method faker.word.conjunction
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random conjunction
   */
  conjunction(length?: number): string {
    var wordList = this.faker.definitions.word.conjunction;
    if (length) {
      wordList = this.faker.definitions.word.conjunction.filter(function (
        word: string
      ) {
        return word.length == length;
      });
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
   * @method faker.word.interjection
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random interjection
   */
  interjection(length?: number): string {
    var wordList = this.faker.definitions.word.interjection;
    if (length) {
      wordList = this.faker.definitions.word.interjection.filter(function (
        word: string
      ) {
        return word.length == length;
      });
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
   * @method faker.word.noun
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random noun
   */
  noun(length?: number): string {
    var wordList = this.faker.definitions.word.noun;
    if (length) {
      wordList = this.faker.definitions.word.noun.filter(function (
        word: string
      ) {
        return word.length == length;
      });
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
   * @method faker.word.preposition
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random preposition
   */
  preposition(length?: number): string {
    var wordList = this.faker.definitions.word.preposition;
    if (length) {
      wordList = this.faker.definitions.word.preposition.filter(function (
        word: string
      ) {
        return word.length == length;
      });
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
   * @method faker.word.verb
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random verb
   */
  verb(length?: number): string {
    var wordList = this.faker.definitions.word.verb;
    if (length) {
      wordList = this.faker.definitions.word.verb.filter(function (
        word: string
      ) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      this.faker.random.arrayElement(wordList) ||
      this.faker.random.arrayElement(this.faker.definitions.word.verb)
    );
  }
}
