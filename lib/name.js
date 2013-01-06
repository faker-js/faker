var Helpers = require('./helpers');
var definitions = require('./definitions');

exports.findName = function () {
    var r = Helpers.randomNumber(8);
    switch (r) {
    case 0:
        return Helpers.randomize(definitions.name_prefix()) + " " + Helpers.randomize(definitions.first_name()) + " " +  Helpers.randomize(definitions.last_name());
    case 1:
        return Helpers.randomize(definitions.first_name()) + " " + Helpers.randomize(definitions.last_name()) + " " + Helpers.randomize(definitions.name_suffix);
    }

    return Helpers.randomize(definitions.first_name()) + " " + Helpers.randomize(definitions.last_name());
};

exports.firstName = function () {
    return Helpers.randomize(definitions.first_name());
};

exports.lastName = function () {
    return Helpers.randomize(definitions.last_name());
};
