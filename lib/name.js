var Helper = require('../helper');
var definitions = require('./definitions');

exports.first_name = function(){
  
  return definitions.first_name[0];
  //Math.floor(Math.random()*10);
  
};

exports.findName = function() {
	switch(Helper.randomNumber(8))
	{
	case 0:
	 return Helper.randomize(definitions.name_prefix) + " " + Helper.randomize(definitions.first_name) + " " +  Helper.randomize(definitions.last_name);
	 break;
	case 1:
	 return Helper.randomize(definitions.first_name) + " " + Helper.randomize(definitions.last_name); + " " + Helper.randomize(definitions.name_suffix);
	  break;
	case 2,3,4,5,6,7:
		return Helper.randomize(definitions.first_name) + Helper.randomize(definitions.last_name);
	  break;
	}
};
    