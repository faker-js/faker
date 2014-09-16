var faker = require('../index'),
    random_ua = require('../vendor/user-agent');

var internet = {

    avatarUri: function () {
        return faker.random.array_element(faker.definitions.internet.avatar_uri);
    },

    email: function (username, provider) {
        provider = provider || faker.random.array_element(faker.definitions.internet.free_email);
        return (username || faker.helpers.slugify(faker.internet.userName())) + "@" + provider;
    },

    userName: function (name) {
        var result;
        switch (faker.random.number(2)) {
        case 0:
            result = (name || faker.name.firstName()) + faker.random.number(99);
            break;
        case 1:
            result = (name || faker.name.firstName()) + faker.random.array_element([".", "_"]) + faker.name.lastName();
            break;
        case 2:
            result = (name || faker.name.firstName()) + faker.random.array_element([".", "_"]) + faker.name.lastName() + faker.random.number(99);
            break;
        }
        return result.replace(/([^A-Z0-9._%+-])/ig, '');
    },

    domainName: function () {
        return faker.internet.domainWord() + "." + faker.internet.domainSuffix();
    },

    domainSuffix: function () {
        return faker.random.array_element(faker.definitions.internet.domain_suffix);
    },

    domainWord:  function () {
        return faker.name.firstName().replace(/([^A-Z0-9._%+-])/ig, '').toLowerCase();
    },

    ip: function () {
        var randNum = function () {
            return (faker.random.number(255)).toFixed(0);
        };

        var result = [];
        for (var i = 0; i < 4; i++) {
            result[i] = randNum();
        }

        return result.join(".");
    },

    userAgent: function () {
      return random_ua.generate();
    },

    color: function (baseRed255, baseGreen255, baseBlue255) {
        // based on awesome response : http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
        var red = Math.floor((faker.random.number(256) + baseRed255) / 2);
        var green = Math.floor((faker.random.number(256) + baseRed255) / 2);
        var blue = Math.floor((faker.random.number(256) + baseRed255) / 2);
        return '#' + red.toString(16) + green.toString(16) + blue.toString(16);

    }
};

module.exports = internet;
