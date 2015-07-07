module['exports'] = require('./lib');

// since we are requiring the top level of faker, load all locales by default
module['exports'].locales = require('./lib/locales');
