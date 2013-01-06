var random = require('./random');

var _name = {
    firstName: function () {
        return random.first_name();
    },

    lastName: function () {
        return random.last_name();
    },

    findName: function () {
        var r = random.number(8);
        switch (r) {
        case 0:
            return random.name_prefix() + " " + _name.firstName() + " " + _name.lastName();
        case 1:
            return _name.firstName() + " " + _name.lastName() + " " + random.name_suffix();
        }

        return _name.firstName() + " " + _name.lastName();
    }
};

module.exports = _name;
