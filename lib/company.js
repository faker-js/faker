var faker = require('../index');

var company = {

    suffixes: function () {
        return ["Inc", "and Sons", "LLC", "Group", "and Daughters"];
    },

    companyName: function (format) {
        switch ((format ? format : faker.random.number(2))) {
        case 0:
            return faker.name.lastName() + " " + faker.company.companySuffix();
        case 1:
            return faker.name.lastName() + "-" + faker.name.lastName();
        case 2:
            return faker.name.lastName() + ", " + faker.name.lastName() + " and " + faker.name.lastName();
        }
    },

    companySuffix: function () {
        return faker.random.array_element(faker.company.suffixes());
    },

    catchPhrase: function () {
        return faker.company.catchPhraseAdjective() + " " +
            faker.company.catchPhraseDescriptor() + " " +
            faker.company.catchPhraseNoun();
    },

    bs: function () {
        return faker.company.bsAdjective() + " " +
            faker.company.bsBuzz() + " " +
            faker.company.bsNoun();
    },

    catchPhraseAdjective: function () {
        return faker.random.array_element(faker.definitions.catch_phrase_adjective);
    },

    catchPhraseDescriptor: function () {
        return faker.random.array_element(faker.definitions.catch_phrase_descriptor);
    },

    catchPhraseNoun: function () {
        return faker.random.array_element(faker.definitions.catch_phrase_noun);
    },

    bsAdjective: function () {
        return faker.random.array_element(faker.definitions.bs_adjective);
    },

    bsBuzz: function () {
        return faker.random.array_element(faker.definitions.bs_buzz);
    },

    bsNoun: function () {
        return faker.random.array_element(faker.definitions.bs_noun);
    }

};

module.exports = company;
