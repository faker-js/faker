if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var faker = require('../index');
}

describe("time.js", function () {
    describe("recent()", function () {
        it("returns the recent timestamp in Unix time format", function () {
            var date = faker.time.recent();
            assert.ok(date == new Date().getTime());
        });

    });

});
