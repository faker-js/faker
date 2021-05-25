if (typeof module !== "undefined") {
  var assert = require("assert");
  var faker = require("../index");
}

describe("word.js", function () {
  var methods = [
    "adjective",
    "adverb",
    "conjunction",
    "interjection",
    "noun",
    "preposition",
    "verb",
  ];
  // Perform the same three tests for each method.
  methods.forEach(function (method) {
    describe(method + "()", function () {
      it("returns random value from " + method + " array", function () {
        var word = faker.word[method]();
        assert.ok(faker.definitions.word[method].includes(word));
      });
      it("optional length parameter returns expected result", function () {
        var wordLength = 5;
        var word = faker.word[method](wordLength);
        assert.ok(faker.definitions.word[method].includes(word));
        assert.ok(word.length == wordLength);
      });
      it("unresolvable optional length returns random " + method, function () {
        var wordLength = 1000;
        var word = faker.word[method](wordLength);
        assert.ok(faker.definitions.word[method].includes(word));
      });
    });
  });
});
