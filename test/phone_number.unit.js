if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var faker = require('../index');
}

describe("phone_number.js", function () {
    describe("phoneNumber()", function () {
        it("returns a random phoneNumber with a random format", function () {
            sinon.spy(faker.helpers, 'replaceSymbolWithNumber');
            var phone_number = faker.phone.phoneNumber();

            assert.ok(phone_number.match(/\d/));
            assert.ok(faker.helpers.replaceSymbolWithNumber.called);

            faker.helpers.replaceSymbolWithNumber.restore();
        });
    });

    describe("phoneNumberFormat()", function () {
      faker.locale = "en";
        it("returns phone number with requested format (Array index)", function () {
            for (var i = 0; i < 10; i++) {
              var phone_number = faker.phone.phoneNumberFormat(1);
              assert.ok(phone_number.match(/\(\d\d\d\) \d\d\d-\d\d\d\d/));
            }
        });
    });


});
