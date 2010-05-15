var Faker = {};

Faker.numerify = function(number_string){
  var str = '';
  for(var i = 0; i < number_string.length; i++){
   if(number_string[i] == "#"){
     str += Math.floor(Math.random()*10);
   }
   else{
     str += number_string[i]
   }
  }
  return str;
};

Faker.letterify = function(letter_string){
  //return letter_string.gsub(/\?/) { ('a'..'z').to_a.rand }
  return 'zzz';
};
Faker.bothify = function(string){
  // self.letterify(self.numerify(string))
  //letterify
  return 'zz11zz';
};
