var Helper = require('../helper');
var definitions = require('./definitions');
 
exports.phoneNumber = function(){
  
  return Helper.numerify(Helper.randomize(definitions.phone_formats));
  
};

