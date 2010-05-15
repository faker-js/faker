var Helpers = require('./helpers');
var definitions = require('./definitions');
 
exports.phoneNumber = function(){
  
  return Helpers.replaceSymbolWithNumber(Helpers.randomize(definitions.phone_formats()));
  
};

