var faker = require('../index');

var _name = {
    firstName: function () {
        return faker.random.array_element(faker.definitions.name.first_name)
    },

    lastName: function () {
      return faker.random.array_element(faker.definitions.name.last_name)
    },

    findName: function (name) {
        var r = faker.random.number(8);
        switch (r) {
        case 0:
            return faker.name.prefix() + " " + (name || faker.name.firstName()) + " " + faker.name.lastName();
        case 1:
            return (name || faker.name.firstName()) + " " + faker.name.lastName() + " " + faker.name.suffix();
        }

        return faker.name.firstName() + " " + faker.name.lastName();
    },

    prefix: function () {
        return faker.random.array_element(faker.definitions.name.prefix);
    },

    suffix: function () {
        return faker.random.array_element(faker.definitions.name.suffix);
    },

};

module.exports = _name;
