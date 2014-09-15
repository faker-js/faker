var faker = require('../index');

var phone = {
    phoneNumber: function () {
        return faker.helpers.replaceSymbolWithNumber(faker.phone.phoneFormats());
    },

    // FIXME: this is strange passing in an array index.
    phoneNumberFormat: function (phoneFormatsArrayIndex) {
        return faker.helpers.replaceSymbolWithNumber(faker.definitions.phone_number.formats[phoneFormatsArrayIndex]);
    },

    phoneFormats: function () {
      return faker.random.array_element(faker.definitions.phone_number.formats);
    }

};

module.exports = phone;
