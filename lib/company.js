var Helpers = require('./helpers');
var Name = require('./name');
var definitions = require('../lib/definitions');

var company = {
    suffixes: ["Inc", "and Sons", "LLC", "Group", "and Daughters"],

    companyName: function (format) {
        switch ((format ? format : Helpers.randomNumber(3))) {
        case 0:
            return Name.lastName() + " " + this.companySuffix();
        case 1:
            return Name.lastName() + "-" + Name.lastName();
        case 2:
            return Name.lastName() + "," + Name.lastName() + " and " + Name.lastName();
        }
    },

    companySuffix: function () {
        return Helpers.randomize(this.suffixes);
    },

    catchPhrase: function () {
        return Helpers.randomize(definitions.catch_phrase_adjective()) + " " +
            Helpers.randomize(definitions.catch_phrase_descriptor()) + " " +
            Helpers.randomize(definitions.catch_phrase_noun());
    },

    bs: function () {
        return Helpers.randomize(definitions.bs_adjective()) + " " +
            Helpers.randomize(definitions.bs_buzz()) + " " +
            Helpers.randomize(definitions.bs_noun());
    }
};

module.exports = company;
