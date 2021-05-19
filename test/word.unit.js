if (typeof module !== "undefined") {
  var assert = require("assert");
  var faker = require("../index");
}

describe.only("word.js", function () {
  faker.seed(Math.random() * 100000000 + 1);
  describe("noun()", function () {
    it("returns random value from noun array", function () {
      var noun = faker.word.noun();
      assert.ok(faker.definitions.word.noun.includes(noun));
    });
  });
  describe("verb()", function () {
    it("returns random value from verb array", function () {
      var verb = faker.word.verb();
      assert.ok(faker.definitions.word.verb.includes(verb));
    });
  });
});
