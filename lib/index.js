/*

   this index.js file is used for including the faker library as a CommonJS module, instead of a bundle

   you can include the faker library into your existing node.js application by requiring the entire /faker directory

    var faker = require(./faker);
    var randomName = faker.name.findName();

   you can also simply include the "faker.js" file which is the auto-generated bundled version of the faker library

    var faker = require(./customAppPath/faker);
    var randomName = faker.name.findName();


  if you plan on modifying the faker library you should be performing your changes in the /lib/ directory

*/
exports.random = require('./random');
exports.fake = require('./fake');

exports.name = require('./name');
exports.address = require('./address');
exports.phone = require('./phone_number');
exports.internet = require('./internet');
exports.company = require('./company');
exports.image = require('./image');
exports.lorem = require('./lorem');
exports.helpers =  require('./helpers');
exports.date = require('./date');
exports.finance = require('./finance');
exports.hacker = require('./hacker');
//exports.commerce = require('./commerce');

// don't load all locales by default
var locales = {};
exports.locales = locales;
locales = require('./locales');

// default locale
exports.locale = "en";

// in case a locale is missing a definition, fallback to this locale
exports.localeFallback = "en";

exports.definitions = {};


var _definitions = {
  "name": ["first_name", "last_name", "prefix", "suffix", "title", "male_first_name", "female_first_name", "male_middle_name", "female_middle_name", "male_last_name", "female_last_name"],
  "address": ["city_prefix", "city_suffix", "street_suffix", "county", "country", "country_code", "state", "state_abbr", "street_prefix", "zipFormat"],
  "company": ["adjective", "noun", "descriptor", "bs_adjective", "bs_noun", "bs_verb", "suffix"],
  "lorem": ["words"],
  "hacker": ["abbreviation", "adjective", "noun", "verb", "ingverb"],
  "phone_number": ["formats"],
  "finance": ["account_type", "transaction_type", "currency"],
  "internet": ["avatar_uri", "domain_suffix", "free_email", "password"],
  "commerce": ["color", "department", "product_name", "price", "categories"],
  "title": "",
  "separator": ""
};

// Create a Getter for all definitions.foo.bar propetries
Object.keys(_definitions).forEach(function(d){
  if (typeof exports.definitions[d] === "undefined") {
    exports.definitions[d] = {};
  }

  if (typeof _definitions[d] === "string") {
      exports.definitions[d] = _definitions[d];
    
    
    return;
  }

  _definitions[d].forEach(function(p){
    Object.defineProperty(exports.definitions[d], p, {
      get: function () {
        if (typeof locales[exports.locale][d] === "undefined" || typeof locales[exports.locale][d][p] === "undefined") {
          // certain localization sets contain less data then others.
          // in the case of a missing defintion, use the default localeFallback to substitute the missing set data
          return locales[exports.localeFallback][d][p];
        } else {
          // return localized data
          return locales[exports.locale][d][p];
        }
      }
    });
  });
});
