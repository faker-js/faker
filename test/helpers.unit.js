if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var Faker = require('../index');
}

describe("helpers.js", function() {
    describe("replaceSymbolWithNumber()", function() {
        context("when no symbol passed in", function() {
            it("uses '#' by default", function() {
                var num = Faker.Helpers.replaceSymbolWithNumber('#AB');
                assert.ok(num.match(/\dAB/));
            });
        });

        context("when symbol passed in", function() {
            it("replaces that symbol with integers", function() {
                var num = Faker.Helpers.replaceSymbolWithNumber('#AB', 'A');
                assert.ok(num.match(/#\dB/));
            });
        });
    });

    describe("createCard()", function() {
        it("returns an object", function() {
            var card = Faker.Helpers.createCard();
            assert.ok(typeof card === 'object');
        });
    });

    describe("userCard()", function() {
        it("returns an object", function() {
            var card = Faker.Helpers.userCard();
            assert.ok(typeof card === 'object');
        });
    });
});
