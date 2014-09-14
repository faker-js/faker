var faker = require('../index'),
    random_ua = require('../vendor/user-agent');

var internet = {

    avatarUri: function () {
        return faker.random.array_element(faker.definitions.avatar_uri);
    },

    email: function () {
        return faker.helpers.slugify(faker.internet.userName()) + "@" + faker.helpers.slugify(faker.internet.domainName());
    },

    userName: function () {
        var result;
        switch (faker.random.number(1)) {
        case 0:
            result = faker.name.firstName();
            break;
        case 1:
            result = faker.name.firstName() + faker.random.array_element([".", "_"]) + faker.name.lastName();
            break;
        }
        return result;
    },

    domainName: function () {
        return faker.internet.domainWord() + "." + faker.internet.domainSuffix();
    },

    domainSuffix: function () {
        return faker.random.array_element(faker.definitions.domain_suffix);
    },

    domainWord:  function () {
        return faker.name.firstName().toLowerCase();
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
