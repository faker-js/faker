var Helpers = require('./helpers');
var faker = require('../index'),
f = faker.fake;

var address = {
    zipCode: function (format) {
		// if zip format is not specified, use the zip format defined for the locale
		if (typeof format === 'undefined') {
		    var localeFormat = faker.definitions.address.zipFormat;
			if (typeof localeFormat === 'string') {
				format = localeFormat;
			} else {
				format = faker.random.array_element(localeFormat);
			}
		}
		return Helpers.replaceSymbols(format);
    },

    city: function (format) {
      var formats = [
        '{{address.cityPrefix}} {{name.firstName}} {{address.citySuffix}}',
        '{{address.cityPrefix}} {{name.firstName}}',
        '{{name.firstName}} {{address.citySuffix}}',
        '{{name.lastName}} {{address.citySuffix}}'
      ];

      if (typeof format !== "number") {
        format = faker.random.number(formats.length - 1);
      }

      return f(formats[format]);

    },

    cityPrefix: function () {
      return faker.random.array_element(faker.definitions.address.city_prefix);
    },

    citySuffix: function () {
      return faker.random.array_element(faker.definitions.address.city_suffix);
    },

    streetName: function () {
        var result;
        switch (faker.random.number(1)) {
        case 0:
            result = faker.name.lastName() + " " + faker.address.streetSuffix();
            break;
        case 1:
            result = faker.name.firstName() + " " + faker.address.streetSuffix();
            break;
        }
        return result;
    },

    //
    // TODO: change all these methods that accept a boolean to instead accept an options hash.
    //
    streetAddress: function (useFullAddress) {
        if (useFullAddress === undefined) { useFullAddress = false; }
        var address = "";
        switch (faker.random.number(2)) {
        case 0:
            address = Helpers.replaceSymbolWithNumber("#####") + " " + faker.address.streetName();
            break;
        case 1:
            address = Helpers.replaceSymbolWithNumber("####") +  " " + faker.address.streetName();
            break;
        case 2:
            address = Helpers.replaceSymbolWithNumber("###") + " " + faker.address.streetName();
            break;
        }
        return useFullAddress ? (address + " " + faker.address.secondaryAddress()) : address;
    },

    streetSuffix: function () {
        return faker.random.array_element(faker.definitions.address.street_suffix);
    },
    
    streetPrefix: function () {
        return faker.random.array_element(faker.definitions.address.street_prefix);
    },

    secondaryAddress: function () {
        return Helpers.replaceSymbolWithNumber(faker.random.array_element(
            [
                'Apt. ###',
                'Suite ###'
            ]
        ));
    },

    county: function () {
      return faker.random.array_element(faker.definitions.address.county);
    },

    country: function () {
      return faker.random.array_element(faker.definitions.address.country);
    },

    countryCode: function () {
      return faker.random.array_element(faker.definitions.address.country_code);
    },

    state: function (useAbbr) {
        return faker.random.array_element(faker.definitions.address.state);
    },

    stateAbbr: function () {
        return faker.random.array_element(faker.definitions.address.state_abbr);
    },

    latitude: function () {
        return (faker.random.number(180 * 10000) / 10000.0 - 90.0).toFixed(4);
    },

    longitude: function () {
        return (faker.random.number(360 * 10000) / 10000.0 - 180.0).toFixed(4);
    }
};

module.exports = address;
