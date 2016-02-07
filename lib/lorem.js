
var Lorem = function (faker) {
  var self = this;
  var Helpers = faker.helpers;

  self.word = function (num) {
    return faker.random.arrayElement(faker.definitions.lorem.words);
  };

  self.words = function (num) {
      if (typeof num == 'undefined') { num = 3; }
      var words = [];
      for (var i = 0; i < num; i++) {
        words.push(faker.lorem.word());
      }
      return words.join(' ');
  };

  self.sentence = function (wordCount, range) {
      if (typeof wordCount == 'undefined') { wordCount = faker.random.number({ min: 3, max: 10 }); }
      // if (typeof range == 'undefined') { range = 7; }

      // strange issue with the node_min_test failing for captialize, please fix and add faker.lorem.back
      //return  faker.lorem.words(wordCount + Helpers.randomNumber(range)).join(' ').capitalize();

      var sentence = faker.lorem.words(wordCount);
      return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  self.sentences = function (sentenceCount, separator) {
      if (typeof sentenceCount === 'undefined') { sentenceCount = faker.random.number({ min: 2, max: 6 });}
      if (typeof separator == 'undefined') { separator = " "; }
      var sentences = [];
      for (sentenceCount; sentenceCount > 0; sentenceCount--) {
        sentences.push(faker.lorem.sentence());
      }
      return sentences.join(separator);
  };

  self.paragraph = function (sentenceCount) {
      if (typeof sentenceCount == 'undefined') { sentenceCount = 3; }
      return faker.lorem.sentences(sentenceCount + faker.random.number(3));
  };

  self.paragraphs = function (paragraphCount, separator) {
    if (typeof separator === "undefined") {
      separator = "\n \r";
    }
    if (typeof paragraphCount == 'undefined') { paragraphCount = 3; }
    var paragraphs = [];
    for (paragraphCount; paragraphCount > 0; paragraphCount--) {
        paragraphs.push(faker.lorem.paragraph());
    }
    return paragraphs.join(separator);
  }

  // returns random text based on a random lorem method
  self.text = function loremText (times) {
    var loremMethods = ['lorem.word', 'lorem.words', 'lorem.sentence', 'lorem.sentences', 'lorem.paragraph', 'lorem.paragraphs', 'lorem.lines'];
    var randomLoremMethod = faker.random.arrayElement(loremMethods);
    return faker.fake('{{' + randomLoremMethod + '}}');
  };

  // returns lines of lorem separated by \n
  self.lines = function lines (lineCount) {
    if (typeof lineCount === 'undefined') { lineCount = faker.random.number({ min: 1, max: 5 });}
    return faker.lorem.sentences(lineCount, '\n')
  };

  return self;
};


module["exports"] = Lorem;
