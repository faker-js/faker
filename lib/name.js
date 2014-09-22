var faker = require('../index');

var _name = {
    firstName: function () {
        return faker.random.array_element(faker.definitions.name.first_name)
    },

    lastName: function () {
      return faker.random.array_element(faker.definitions.name.last_name)
    },

    findName: function (firstName, lastName) {
        var r = faker.random.number(8);
        firstName = firstName || faker.name.firstName();
        lastName = lastName || faker.name.lastName();
        switch (r) {
        case 0:
            return faker.name.prefix() + " " + firstName + " " + lastName;
        case 1:
            return firstName + " " + lastName + " " + faker.name.suffix();
        }

        return firstName + " " + lastName;
    },

    prefix: function () {
        return faker.random.array_element(faker.definitions.name.prefix);
    },

    suffix: function () {
        return faker.random.array_element(faker.definitions.name.suffix);
    },

};

module.exports = _name;
