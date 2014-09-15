var faker = require('../index');

var _name = {
    firstName: function () {
        return faker.random.array_element(faker.definitions.name.first_name)
    },

    //Working as intended
    firstNameFemale: function () {
        return faker.name.firstName();
    },
    //Working as intended
    firstNameMale: function () {
        return faker.name.firstName();
    },

    lastName: function () {
      return faker.random.array_element(faker.definitions.name.last_name)
    },

    findName: function () {
        var r = faker.random.number(8);
        switch (r) {
        case 0:
            return faker.name.prefix() + " " + faker.name.firstName() + " " + faker.name.lastName();
        case 1:
            return faker.name.firstName() + " " + faker.name.lastName() + " " + faker.name.suffix();
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
