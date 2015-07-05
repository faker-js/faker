var faker = require('../index'),
f = faker.fake;

var company = {

    suffixes: function () {
      // Don't want the source array exposed to modification, so return a copy
      return faker.definitions.company.suffix.slice(0);
    },

    companyName: function (format) {

      var formats = [
        '{{name.lastName}} {{company.companySuffix}}',
        '{{name.lastName}} - {{name.lastName}}',
        '{{name.lastName}}, {{name.lastName}} and {{name.lastName}}'
      ];

      if (typeof format !== "number") {
        format = faker.random.number(formats.length);
      }

      return f(formats[format]);
    },

    companySuffix: function () {
        return faker.random.array_element(faker.company.suffixes());
    },

    catchPhrase: function () {
      return f('{{company.catchPhraseAdjective}} {{company.catchPhraseDescriptor}} {{company.catchPhraseNoun}}')
    },

    bs: function () {
      return f('{{company.bsAdjective}} {{company.bsBuzz}} {{company.bsNoun}}');
    },

    catchPhraseAdjective: function () {
        return faker.random.array_element(faker.definitions.company.adjective);
    },

    catchPhraseDescriptor: function () {
        return faker.random.array_element(faker.definitions.company.descriptor);
    },

    catchPhraseNoun: function () {
        return faker.random.array_element(faker.definitions.company.noun);
    },

    bsAdjective: function () {
        return faker.random.array_element(faker.definitions.company.bs_adjective);
    },

    bsBuzz: function () {
        return faker.random.array_element(faker.definitions.company.bs_verb);
    },

    bsNoun: function () {
        return faker.random.array_element(faker.definitions.company.bs_noun);
    }

};

module.exports = company;
