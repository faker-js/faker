var Name = require('./name');
var random = require('../lib/random');

var company = {
    suffixes: ["Inc", "and Sons", "LLC", "Group", "and Daughters"],

    companyName: function (format) {
        switch ((format ? format : random.number(3))) {
        case 0:
            return Name.lastName() + " " + this.companySuffix();
        case 1:
            return Name.lastName() + "-" + Name.lastName();
        case 2:
            return Name.lastName() + ", " + Name.lastName() + " and " + Name.lastName();
        }
    },

    companySuffix: function () {
        return random.array_rand(this.suffixes);
    },

    catchPhrase: function () {
        return random.catch_phrase_adjective() + " " +
            random.catch_phrase_descriptor() + " " +
            random.catch_phrase_noun();
    },

    bs: function () {
        return random.bs_adjective() + " " +
            random.bs_buzz() + " " +
            random.bs_noun();
    }
};

module.exports = company;
