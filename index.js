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

exports.name = require('./lib/name');
exports.address = require('./lib/address');
exports.phoneNumber = require('./lib/phone_number');
exports.internet = require('./lib/internet');
exports.company = require('./lib/company');
exports.image = require('./lib/image');
exports.lorem = require('./lib/lorem');
exports.helpers =  require('./lib/helpers');
exports.tree = require('./lib/tree');
exports.date = require('./lib/date');
exports.random = require('./lib/random');
exports.definitions = require('./lib/definitions');
exports.finance = require('./lib/finance');

exports.locales = require('./lib/locales');
