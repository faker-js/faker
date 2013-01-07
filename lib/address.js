var helpers = require('./helpers');
var random = require('./random');
var definitions = require('../lib/definitions');

exports.zipCode = function () {
    return helpers.replaceSymbolWithNumber(helpers.randomize(["#####", '#####-####']));
};

exports.zipCodeFormat = function (format) {
    return helpers.replaceSymbolWithNumber(["#####", '#####-####'][format]);
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
        address = helpers.replaceSymbolWithNumber("#####") + " " + this.streetName();
        break;
    case 1:
        address = helpers.replaceSymbolWithNumber("####") +  " " + this.streetName();
        break;
    case 2:
        address = helpers.replaceSymbolWithNumber("###") + " " + this.streetName();
        break;
    }
    return useFullAddress ? (address + " " + this.secondaryAddress()) : address;
};

exports.secondaryAddress = function () {
    return helpers.replaceSymbolWithNumber(helpers.randomize(
        [
            'Apt. ###',
            'Suite ###'
        ]
    ));
};

exports.brState = function (useAbbr) {
    return useAbbr ? random.br_state_abbr() : random.br_state();
};

exports.ukCounty = function () {
    return random.uk_county();
};

exports.ukCountry = function () {
    return random.uk_country();
};

exports.usState = function (useAbbr) {
    return useAbbr ? random.us_state_abbr() : random.us_state();
};
