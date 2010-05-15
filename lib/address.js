var Faker = {};

var Helper = require('../helper');
var definitions = require('../lib/definitions');

exports.zip_code = function() {
	return Helper.numerify(Helper.randomize(["#####", '#####-####']));
};

exports.city = function() {
	switch(Helper.randomNumber(3))
	{
	case 0:
	 return Helper.randomize(definitions.city_prefix) + " " + Helper.randomize(definitions.first_name) + Helper.randomize(definitions.city_suffix);
	 break;
	case 1:
	 return Helper.randomize(definitions.city_prefix) + " " + Helper.randomize(definitions.first_name);
	  break;
	case 2:
		return Helper.randomize(definitions.first_name) + Helper.randomize(definitions.city_suffix);
		break;
	case 3:
		return Helper.randomize(definitions.last_name) + Helper.randomize(definitions.city_suffix);
	  break;
	}
};

exports.street_name = function() {
	switch(Helper.randomNumber(1))
	{
	case 0:
	 return Helper.randomize(definitions.last_name) + " " + Helper.randomize(definitions.street_suffix);
	 break;
	case 1:
	 return Helper.randomize(definitions.first_name) + " " + Helper.randomize(definitions.street_suffix);
	 break;
	}
};

exports.street_address = function(i) {
	if( typeof i == 'undefined'){ var i = false;}
	var address = "";
	switch(Helper.randomNumber(2))
		{
		case 0:
		 address =  Helper.numerify("#####") + " " + this.street_name();
		 break;
		case 1:
		 address = Helper.numerify("####") +  " " + this.street_name();
		 break;
		case 2:
		 address = Helper.numerify("###") + " " + this.street_name();
		 break;
		}
	var full_address = i ?  address + " " + this.secondaryAddress() : address;
	return full_address;
};


exports.secondaryAddress = function() {
	 	return Helper.numerify(Helper.randomize(
		[
			'Apt. ###',
    	'Suite ###'
		]
	)
	);
};
