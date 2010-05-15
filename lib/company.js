var Helper = require('../helper');
var definitions = require('../lib/definitions');

exports.companyName = function() {
	switch(Helper.randomNumber(3))
	{
	case 0:
		return Helper.randomize(definitions.last_name) + " " + this.companySuffix();
		break;
	case 1:
		return Helper.randomize(definitions.last_name) + "-" + Helper.randomize(definitions.last_name) ;
		break;
	case 2:
		return Helper.randomize(definitions.last_name) + "," + Helper.randomize(definitions.last_name) + " and " + Helper.randomize(definitions.last_name);
		break;
	}
};

exports.companySuffix = function() {
	 return Helper.randomize(["Inc", "and\ Sons", "LLC", "Group"]);
};

exports.catchPhrase = function() {
	return Helper.randomize(definitions.catch_phrase_adjective) + " " + Helper.randomize(definitions.catch_phrase_descriptor) + " "+ Helper.randomize(definitions.catch_phrase_noun);
};

exports.bs = function() {
	return Helper.randomize(definitions.bs_adjective) + " " + Helper.randomize(definitions.bs_buzz) + " "+ Helper.randomize(definitions.bs_noun);
};