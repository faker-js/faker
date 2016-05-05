if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var faker = require('../index');
}

// Basic smoke tests to make sure each method is at least implemented and returns a string.

var modules = {
    address: [
        'city', 'streetName', 'streetAddress', 'secondaryAddress',
        'country', 'county', 'state', 'zipCode'
    ],

    company: ['companyName', 'companySuffix', 'catchPhrase', 'bs'],

    database: ['column', 'collation', 'engine', 'type'],

    internet: ['email', 'userName', 'domainName', 'domainWord', 'ip'],

    lorem: ['words', 'sentence', 'slug', 'sentences', 'paragraph', 'paragraphs'],

    name: ['firstName', 'lastName', 'findName', 'jobTitle'],

    phone: ['phoneNumber'],

    finance: ['account', 'accountName', 'mask', 'amount', 'transactionType', 'currencyCode', 'currencyName', 'currencySymbol']

//    commerce: ['color', 'department', 'productName', 'price']
};

describe("functional tests", function () {

    function assertMethodResult(meth, result) {
        if (meth === 'boolean') {
            assert.ok(result === true || result === false);
        } else {
            assert.ok(result);
        }
    }

    for(var locale in faker.locales) {
      faker.locale = locale;
      Object.keys(modules).forEach(function (module) {
          describe(module, function () {
              modules[module].forEach(function (meth) {
                  it(meth + "()", function () {
                      assertMethodResult(meth, faker[module][meth]());
                  });

                  it(meth + "() without context", function () {
                      assertMethodResult(meth, faker[module][meth].call(null));
                  });
              });
          });
      });
    }

});
