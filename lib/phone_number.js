var faker = require('../index');
var Helpers = require('./helpers');
var definitions = require('./definitions');

var phone = {
    phoneNumber: function () {
        return Helpers.replaceSymbolWithNumber(faker.random.array_element(definitions.phone_formats));
    },

    // FIXME: this is strange passing in an array index.
    phoneNumberFormat: function (phoneFormatsArrayIndex) {
        return Helpers.replaceSymbolWithNumber(faker.definitions.phone_formats[phoneFormatsArrayIndex]);
    },

    phoneCode: function () {
      return faker.random.array_element(faker.definitions.phone_codes);
    },

    phoneFormats: function () {
      return faker.random.array_element(definitions.phone_formats);
    }

};

module.exports = phone;
