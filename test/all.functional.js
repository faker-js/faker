if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var faker = require('../index');
}

// Basic smoke tests to make sure each method is at least implemented and returns a string.

var modules = {
    address: [
        'city', 'streetName', 'streetAddress', 'secondaryAddress',
        'brState', 'ukCountry', 'ukCounty', 'usState', 'zipCode'
    ],

    company: ['companyName', 'companySuffix', 'catchPhrase', 'bs'],

    internet: ['email', 'userName', 'domainName', 'domainWord', 'ip'],

    lorem: ['words', 'sentence', 'sentences', 'paragraph', 'paragraphs'],

    name: ['firstName', 'lastName', 'findName'],

    phoneNumber: ['phoneNumber']
};

describe("functional tests", function () {
    Object.keys(modules).forEach(function (module) {
        describe(module, function () {
            modules[module].forEach(function (meth) {
                it(meth + "()", function () {
                    var result = faker[module][meth]();
                    assert.ok(result);
                });
            });
        });
    });

    describe("Address", function () {
        it("zipCodeFormat()", function () {
            var result = faker.address.zipCodeFormat(0);
            assert.ok(!result.match(/-/));

            result = faker.address.zipCodeFormat(1);
            assert.ok(result.match(/-/));
        });
    });
});
