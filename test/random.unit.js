if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var faker = require('../index');
}

describe("random.js", function () {
  describe("number", function() {
    it("returns a random number given a maximum value", function() {
      var max = 10;
      assert.ok(faker.random.number(max) < max);
    });
    it("returns a random number between a range", function() {
      var range = [1, 10];
      var min = range[0];
      var max = range[1]
      var randomNumber = faker.random.number(range);
      assert.ok( randomNumber >= min);
      assert.ok( randomNumber <= max);
    });
  });
});
