var assert = require('assert');
var sinon = require('sinon');
var Faker = require('../index');


// Basic smoke tests to make sure each method is at least implemented and returns a string.

var modules = {
    address: [
        'city', 'streetName', 'streetAddress', 'secondaryAddress',
        'brState', 'ukCountry', 'ukCounty', 'usState', 'zipCode'//, 'zipCodeFormat'
    ],

    company: ['companyName', 'companySuffix', 'catchPhrase', 'bs'],

    internet: ['email', 'userName', 'domainName', 'domainWord', 'ip'],

    lorem: ['words', 'sentence', 'sentences', 'paragraph', 'paragraphs'],

    name: ['firstName', 'lastName', 'findName'],

    phoneNumber: ['phoneNumber']
};

// Backward compatibility.
modules.Address = modules.address;
modules.Company = modules.company;
modules.Internet = modules.internet;
modules.Lorem = modules.lorem;
modules.Name = modules.name;
modules.PhoneNumber = modules.phoneNumber;

describe("functional tests", function () {
    Object.keys(modules).forEach(function (module) {
        describe(module, function () {
            modules[module].forEach(function (meth) {
                it(meth + "()", function () {
                    var result = Faker[module][meth]();
                    assert.ok(result);
                });
            });
        });
    });

    describe("Address", function() {
        it("zipCodeFormat()", function() {
            var result = Faker.Address.zipCodeFormat(0);
            assert.ok(!result.match(/-/));

            result = Faker.Address.zipCodeFormat(1);
            assert.ok(result.match(/-/));
        });
    });
});
