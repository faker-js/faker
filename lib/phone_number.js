var faker = require('../index');

var phone = {
    phoneNumber: function (format) {
        format = format || faker.phone.phoneFormats();
        return faker.helpers.replaceSymbolWithNumber(format);
    },

    // FIXME: this is strange passing in an array index.
    phoneNumberFormat: function (phoneFormatsArrayIndex) {
        phoneFormatsArrayIndex = phoneFormatsArrayIndex || 0;
        return faker.helpers.replaceSymbolWithNumber(faker.definitions.phone_number.formats[phoneFormatsArrayIndex]);
    },

    phoneFormats: function () {
      return faker.random.array_element(faker.definitions.phone_number.formats);
    }

};

module.exports = phone;
