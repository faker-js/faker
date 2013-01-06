var Helpers = require('./helpers');
var definitions = require('./definitions');

var _name = {
    firstName: function () {
        return Helpers.randomize(definitions.first_name());
    },

    lastName: function () {
        return Helpers.randomize(definitions.last_name());
    },

    findName: function () {
        var r = Helpers.randomNumber(8);
        switch (r) {
        case 0:
            return Helpers.randomize(definitions.name_prefix()) + " " + _name.firstName() + " " + _name.lastName();
        case 1:
            return _name.firstName() + " " + _name.lastName() + " " + Helpers.randomize(definitions.name_suffix);
        }

        return _name.firstName() + " " + _name.lastName();
    }
};

module.exports = _name;
