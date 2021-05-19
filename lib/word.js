/**
 *
 * @namespace faker.word
 */
var Word = function (faker) {
  var self = this;
  /**
   * returns a noun
   *
   * @method faker.noun
   */
  self.noun = function () {
    return faker.random.arrayElement(faker.definitions.word.noun);
  };
  /**
   * returns a verb
   *
   * @method faker.verb
   */
  self.verb = function () {
    return faker.random.arrayElement(faker.definitions.word.verb);
  };

  return self;
};

module["exports"] = Word;
