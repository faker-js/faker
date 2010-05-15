(function (Helper) {

Helper.randomNumber = function(number) {
		r = Math.floor(Math.random()*number);
		return r;
};
	
Helper.randomize = function(array) {
		r = Math.floor(Math.random()*array.length);
		return array[r];
};

Helper.numerify = function(number_string){
  var str = '';
  for(var i = 0; i < number_string.length; i++){
   if(number_string[i] == "#"){
     str += Math.floor(Math.random()*10);
   }
   else{
     str += number_string[i];
   }
  }
  return str;
};

Helper.shuffle = function(o){ 
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

Helper.letterify = function(letter_string){
  //return letter_string.gsub(/\?/) { ('a'..'z').to_a.rand }
  return 'zzz';
};
Helper.bothify = function(string){
  // self.letterify(self.numerify(string))
  //letterify
  return 'zz11zz';
};

})(
    // exports will be set in any commonjs platform; use it if it's available
    typeof exports !== "undefined" ?
    exports :
    // otherwise construct a name space.  outside the anonymous function,
    // "this" will always be "window" in a browser, even in strict mode.
    this.window = {}
);