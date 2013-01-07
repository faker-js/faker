var Helpers = require('./helpers');
var random = require('./random');
var definitions = require('../lib/definitions');

exports.zipCode = function () {
    return Helpers.replaceSymbolWithNumber(Helpers.randomize(["#####", '#####-####']));
};

exports.zipCodeFormat = function (format) {
    return Helpers.replaceSymbolWithNumber(["#####", '#####-####'][format]);
};

exports.city = function () {
    switch (random.number(3)) {
    case 0:
        return random.city_prefix() + " " + random.first_name() + random.city_suffix();
    case 1:
        return random.city_prefix() + " " + random.first_name();
    case 2:
        return random.first_name() + random.city_suffix();
    case 3:
        return random.last_name() + random.city_suffix();
    }
};

exports.streetName = function () {
    switch (random.number(1)) {
    case 0:
        return random.last_name() + " " + random.street_suffix();
    case 1:
        return random.first_name() + " " + random.street_suffix();
    }
};

//
// TODO: change all these methods that accept a boolean to instead accept an options hash.
//
exports.streetAddress = function (useFullAddress) {
    if (useFullAddress === undefined) { useFullAddress = false; }
    var address = "";
    switch (random.number(2)) {
    case 0:
        address = Helpers.replaceSymbolWithNumber("#####") + " " + this.streetName();
        break;
    case 1:
        address = Helpers.replaceSymbolWithNumber("####") +  " " + this.streetName();
        break;
    case 2:
        address = Helpers.replaceSymbolWithNumber("###") + " " + this.streetName();
        break;
    }
    return useFullAddress ? (address + " " + this.secondaryAddress()) : address;
};

exports.secondaryAddress = function () {
    return Helpers.replaceSymbolWithNumber(Helpers.randomize(
        [
            'Apt. ###',
            'Suite ###'
        ]
    ));
};

exports.brState = function (abbr) {
    return Helpers.randomize(definitions[abbr ? 'br_state_abbr' : 'br_state']());
};

exports.ukCounty = function () {
    return Helpers.randomize(definitions.uk_county());
};

exports.ukCountry = function () {
    return Helpers.randomize(definitions.uk_country());
};

exports.usState = function (abbr) {
    return Helpers.randomize(definitions[abbr ? 'us_state_abbr' : 'us_state']());
};
