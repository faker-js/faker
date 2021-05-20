/**
 * @namespace faker.word
 */
var Word = function (faker) {
  var self = this;
  /**
   * Returns an adjective of random or optionally specified length.
   * If specified length is unresolvable, returns random adjective.
   *
   * @method faker.word.adjective
   * @param {number} [length] - optional length of word to return
   * @returns {string}          a random adjective
   */
  self.adjective = function (length) {
    var wordList = faker.definitions.word.adjective;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.adjective.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      faker.random.arrayElement(wordList) ||
      faker.random.arrayElement(faker.definitions.word.adjective)
    );
  };
  /**
   * Returns an adverb of random or optionally specified length.
   * If specified length is unresolvable, returns random adverb.
   *
   * @method faker.word.adverb
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random adverb
   */
  self.adverb = function (length) {
    var wordList = faker.definitions.word.adverb;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.adverb.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      faker.random.arrayElement(wordList) ||
      faker.random.arrayElement(faker.definitions.word.adverb)
    );
  };
  /**
   * Returns a conjunction of random or optionally specified length.
   * If specified length is unresolvable, returns random conjunction.
   *
   * @method faker.word.conjunction
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random conjunction
   */
  self.conjunction = function (length) {
    var wordList = faker.definitions.word.conjunction;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.conjunction.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      faker.random.arrayElement(wordList) ||
      faker.random.arrayElement(faker.definitions.word.conjunction)
    );
  };
  /**
   * Returns an interjection of random or optionally specified length.
   * If specified length is unresolvable, returns random interjection.
   *
   * @method faker.word.interjection
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random interjection
   */
  self.interjection = function (length) {
    var wordList = faker.definitions.word.interjection;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.interjection.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      faker.random.arrayElement(wordList) ||
      faker.random.arrayElement(faker.definitions.word.interjection)
    );
  };
  /**
   * Returns a noun of random or optionally specified length.
   * If specified length is unresolvable, returns random noun.
   *
   * @method faker.word.noun
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random noun
   */
  self.noun = function (length) {
    var wordList = faker.definitions.word.noun;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.noun.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      faker.random.arrayElement(wordList) ||
      faker.random.arrayElement(faker.definitions.word.noun)
    );
  };
  /**
   * Returns a preposition of random or optionally specified length.
   * If specified length is unresolvable, returns random preposition.
   *
   * @method faker.word.preposition
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random preposition
   */
  self.preposition = function (length) {
    var wordList = faker.definitions.word.preposition;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.preposition.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      faker.random.arrayElement(wordList) ||
      faker.random.arrayElement(faker.definitions.word.preposition)
    );
  };
  /**
   * Returns a verb of random or optionally specified length.
   * If specified length is unresolvable, returns random verb.
   *
   * @method faker.word.verb
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random verb
   */
  self.verb = function (length) {
    var wordList = faker.definitions.word.verb;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.verb.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      faker.random.arrayElement(wordList) ||
      faker.random.arrayElement(faker.definitions.word.verb)
    );
  };

  return self;
};

module["exports"] = Word;
