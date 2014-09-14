var fs = require('fs'),
    files = fs.readdirSync(__dirname + '/locales/');

files.forEach(function(item){
  exports[item.replace('.js', '')] = require(__dirname + '/locales/' + item);
});