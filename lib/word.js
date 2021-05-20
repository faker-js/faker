/**
 *
 * @namespace faker.word
 */
var Word = function (faker) {
  var self = this;
  /**
   * returns an adjective
   *
   * @method faker.adjective
   * @param {number} [length] - optional length of word to return. Returns
   *                            stringified 'undefined' if unable to meet criteria.
   */
  self.adjective = function (length) {
    var wordList = faker.definitions.word.adjective;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.adjective.filter(function (word) {
        return word.length == length;
      });
    }
    return faker.random.arrayElement(wordList) || "undefined";
  };
  /**
   * returns an adverb
   *
   * @method faker.adverb
   * @param {number} [length] - optional length of word to return. Returns
   *                            stringified 'undefined' if unable to meet criteria.
   */
  self.adverb = function (length) {
    var wordList = faker.definitions.word.adverb;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.adverb.filter(function (word) {
        return word.length == length;
      });
    }
    return faker.random.arrayElement(wordList) || "undefined";
  };
  /**
   * returns a conjunction
   *
   * @method faker.conjunction
   * @param {number} [length] - optional length of word to return. Returns
   *                            stringified 'undefined' if unable to meet criteria.
   */
  self.conjunction = function (length) {
    var wordList = faker.definitions.word.conjunction;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.conjunction.filter(function (word) {
        return word.length == length;
      });
    }
    return faker.random.arrayElement(wordList) || "undefined";
  };
  /**
   * returns an interjection
   *
   * @method faker.interjection
   * @param {number} [length] - optional length of word to return. Returns
   *                            stringified 'undefined' if unable to meet criteria.
   */
  self.interjection = function (length) {
    var wordList = faker.definitions.word.interjection;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.interjection.filter(function (word) {
        return word.length == length;
      });
    }
    return faker.random.arrayElement(wordList) || "undefined";
  };
  /**
   * returns a noun
   *
   * @method faker.noun
   * @param {number} [length] - optional length of word to return. Returns
   *                            stringified 'undefined' if unable to meet criteria.
   */
  self.noun = function (length) {
    var wordList = faker.definitions.word.noun;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.noun.filter(function (word) {
        return word.length == length;
      });
    }
    return faker.random.arrayElement(wordList) || "undefined";
  };
  /**
   * returns a preposition
   *
   * @method faker.preposition
   * @param {number} [length] - optional length of word to return. Returns
   *                            stringified 'undefined' if unable to meet criteria.
   */
  self.preposition = function (length) {
    var wordList = faker.definitions.word.preposition;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.preposition.filter(function (word) {
        return word.length == length;
      });
    }
    return faker.random.arrayElement(wordList) || "undefined";
  };
  /**
   * returns a verb
   *
   * @method faker.verb
   * @param {number} [length] - optional length of word to return. Returns
   *                            stringified 'undefined' if unable to meet criteria.
   */
  self.verb = function (length) {
    var wordList = faker.definitions.word.verb;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = faker.definitions.word.verb.filter(function (word) {
        return word.length == length;
      });
    }
    return faker.random.arrayElement(wordList) || "undefined";
  };

  return self;
};

module["exports"] = Word;
