var Helpers = require('./helpers');
var definitions = require('./definitions');


exports.account = function(length){
  
  if(!length) length    = 8;
  
  var template = '';
  
  for(var i=0; i<length; i++)
  {
    template = template + '#';
  }

  return Helpers.replaceSymbolWithNumber(template);
};


exports.accountName = function(){
  
  return [Helpers.randomize(definitions.account_type()), 'Account'].join(' ')
};

exports.mask = function(length, parens, elipsis){
  
  //set defaults
  if(!length) length    = 4;
  if(!parens) parens    = true;
  if(!elipsis) elipsis  = true;
  
  //create a template for length
  var template = '';
  
  for(var i=0; i<length; i++)
  {
    template = template + '#';
  }
  
  //generate random numbers
  template = Helpers.replaceSymbolWithNumber(template);
  
  //prefix with elipsis
  if(elipsis) template = ['...', template].join('');
  
  if(parens) template = ['(', template ,')'].join('');
  
  return template;
  
};

//min and max take in minimum and maximum amounts, dec is the decimal place you want rounded to, symbol is $, €, £, etc
//NOTE: this returns a string representation of the value, if you want a number use parseFloat and no symbol
exports.amount = function(min, max, dec, symbol){
  
  if(!min)    min     = 1
  if(!max)    max     = 1000
  if(!dec)    dec     = 2
  if(!symbol) symbol  = ''  //default to nothing
  
  
  return symbol + Math.round((Math.random() * (max - min) + min)*Math.pow(10,dec))/Math.pow(10,dec);
  
};

exports.transactionType = function(){
  return Helpers.randomize(definitions.transaction_type());
};
