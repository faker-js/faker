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
	return this.domainWord() + "." + Helper.randomize(definitions.domain_suffix);
};

exports.domainWord = function() {
  return Helper.randomize(definitions.first_name).toLowerCase();
}