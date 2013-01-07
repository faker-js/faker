var helpers = require('./helpers');
var Faker = require('../index');
var definitions = require('../lib/definitions');

exports.zipCode = function () {
    return helpers.replaceSymbolWithNumber(helpers.randomize(["#####", '#####-####']));
};

exports.zipCodeFormat = function (format) {
    return helpers.replaceSymbolWithNumber(["#####", '#####-####'][format]);
};

exports.city = function () {
    switch (Faker.random.number(3)) {
    case 0:
        return Faker.random.city_prefix() + " " + Faker.random.first_name() + Faker.random.city_suffix();
    case 1:
        return Faker.random.city_prefix() + " " + Faker.random.first_name();
    case 2:
        return Faker.random.first_name() + Faker.random.city_suffix();
    case 3:
        return Faker.random.last_name() + Faker.random.city_suffix();
    }
};

exports.streetName = function () {
    switch (Faker.random.number(1)) {
    case 0:
        return Faker.random.last_name() + " " + Faker.random.street_suffix();
    case 1:
        return Faker.random.first_name() + " " + Faker.random.street_suffix();
    }
};

//
// TODO: change all these methods that accept a boolean to instead accept an options hash.
//
exports.streetAddress = function (useFullAddress) {
    if (useFullAddress === undefined) { useFullAddress = false; }
    var address = "";
    switch (Faker.random.number(2)) {
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
    return useAbbr ? Faker.random.br_state_abbr() : Faker.random.br_state();
};

exports.ukCounty = function () {
    return Faker.random.uk_county();
};

exports.ukCountry = function () {
    return Faker.random.uk_country();
};

exports.usState = function (useAbbr) {
    return useAbbr ? Faker.random.us_state_abbr() : Faker.random.us_state();
};
