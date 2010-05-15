var Helper = require('../helper');
var definitions = require('./definitions');

exports.email = function() {
	return this.userName() + "@" + this.domainName(); 
};

exports.userName = function() {
	switch(Helper.randomNumber(2))
	{
	case 0:
		return Helper.randomize(definitions.first_name);
		break;
	case 1:
		return Helper.randomize(definitions.first_name) + Helper.randomize([".", "_"]) + Helper.randomize(definitions.last_name) ;
		break;
	}
};

exports.domainName = function() {
	Helper.randomize(definitions.catch_phrase_adjective) + "." + Helper.randomize(definitions.domain_suffix);
};