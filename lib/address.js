var Faker = {};

var Helper = require('../helper');
var definitions = require('../lib/definitions');

exports.zip_code = function() {
	return Helper.numerify(Helper.randomize(["#####", '#####-####']));
};

exports.city = function() {
	//
};

exports.street_name = function() {
	switch(Helper.randomNumber(3))
	{
	case 0:
	  return Helper.randomize(definitions.first_name) + " " + Helper.randomize(definitions.first_name) + Helper.randomize(definitions.city_suffix);
	  break;
	case 1:
		 return Helper.randomize(definitions.first_name) + " " + Helper.randomize(definitions.first_name) + Helper.randomize(definitions.city_suffix);
	  break;
	case 2:
		 return Helper.randomize(definitions.first_name) + " " + Helper.randomize(definitions.first_name) + Helper.randomize(definitions.city_suffix);
		break;
	case 3:
		 return Helper.randomize(definitions.first_name) + " " + Helper.randomize(definitions.first_name) + Helper.randomize(definitions.city_suffix);
	  break;
	}
};


exports.secondary_address = function() {
	 	return Helper.numerify(Helper.randomize(
		[
			'Apt. ###',
    	'Suite ###'
		]
	)
	);
};
