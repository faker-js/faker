var Faker = {};

var Helper = require('../helper');

var company = exports.zip_code = function() {
	return Helper.numerify(Helper.randomize(["#####", '#####-####']));
};
