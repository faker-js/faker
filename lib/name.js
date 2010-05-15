var Helper = require('./helper');
var definitions = require('./definitions');
 
exports.first_name = function(){
  
  return definitions.first_name[0];
  //Math.floor(Math.random()*10);
  
};

exports.findName = function() {
	var r = Helper.randomNumber(8);
	switch(r)
	{
	case 0:
	 return Helper.randomize(definitions.name_prefix) + " " + Helper.randomize(definitions.first_name) + " " +  Helper.randomize(definitions.last_name);
	 break;
	case 1:
	 return Helper.randomize(definitions.first_name) + " " + Helper.randomize(definitions.last_name); + " " + Helper.randomize(definitions.name_suffix);
	  break;
	}

	return Helper.randomize(definitions.first_name) + " " + Helper.randomize(definitions.last_name);

};
    