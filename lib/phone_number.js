var Helper = require('./helper');
var definitions = require('./definitions');
 
exports.phoneNumber = function(){
  
  return Helper.replaceSymbolWithNumber(Helper.randomize(definitions.phone_formats));
  
};

