"use strict";
// since we are requiring the top level of faker, load all locales by default
var lib_1 = require("./lib");
var faker = new lib_1.Faker({ locales: require('./lib/locales') });
module.exports = faker;
