(function (Helpers) {

// returns a single random number based on a range 
Helpers.randomNumber = function(range) {
		r = Math.floor(Math.random()*range);
		return r;
};

// takes an array and returns the array randomly sorted
Helpers.randomize = function(array) {
		r = Math.floor(Math.random()*array.length);
		return array[r];
};

// parses string for a symbol and replace it with a random number from 1-10  
Helpers.replaceSymbolWithNumber = function(string, symbol){
  
  // default symbol is '#' 
  if(typeof symbol == 'undefined'){
    var symbol = '#';
  }
  
  var str = '';
  for(var i = 0; i < string.length; i++){
   if(string[i] == symbol){
     str += Math.floor(Math.random()*10);
   }
   else{
     str += string[i];
   }
  }
  return str;
};

// takes an array and returns it randomized 
Helpers.shuffle = function(o){ 
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

})(
    // exports will be set in any commonjs platform; use it if it's available
    typeof exports !== "undefined" ?
    exports :
    // otherwise construct a name space.  outside the anonymous function,
    // "this" will always be "window" in a browser, even in strict mode.
    this.window = {}
);

String.prototype.capitalize = function(){ //v1.0
    return this.replace(/\w+/g, function(a){
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
    });
};
