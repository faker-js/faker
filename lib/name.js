var Faker = require('../index');

var _name = {
    firstName: function ( gender ) {
        return Faker.random.first_name( gender );
    },

    lastName: function () {
        return Faker.random.last_name();
    },

    findName: function ( gender ) {
        var r = Faker.random.number(8);
        switch (r) {
        case 0:
            return Faker.random.name_prefix() + " " + this.firstName( gender ) + " " + this.lastName();
        case 1:
            return this.firstName( gender ) + " " + this.lastName() + " " + Faker.random.name_suffix();
        }

        return this.firstName( gender ) + " " + this.lastName();
    },

    gender: function() {
        return Faker.random.gender();
    }
};

module.exports = _name;
