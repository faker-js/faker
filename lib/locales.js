if (typeof window === "undefined") {
  // if node, load all locales into memory by default
  var fs = require('fs'),
      files = fs.readdirSync(__dirname + '/locales/');

  files.forEach(function(item){
    exports[item.replace('.js', '')] = require(__dirname + '/locales/' + item);
  });
} else {
  // if browser, only load en locale
  // TODO: setup Gulp build step to generate multiple browser packages
  exports['en'] = require('./locales/en.js');
}
