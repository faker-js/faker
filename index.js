/*

   this index.js file is used for including the Faker library as a CommonJS module, instead of a bundle

   you can include the Faker library into your existing node.js application by requiring the entire /Faker directory

    var Faker = require(./Faker);
    var randomName = Faker.Name.findName();

   you can also simply include the "Faker.js" file which is the auto-generated bundled version of the Faker library

    var Faker = require(./customAppPath/Faker);
    var randomName = Faker.Name.findName();


  if you plan on modifying the Faker library you should be performing your changes in the /lib/ directory

*/

exports.name = require('./lib/name');
exports.address = require('./lib/address');
exports.phoneNumber = require('./lib/phone_number');
exports.internet = require('./lib/internet');
exports.company = require('./lib/company');
exports.lorem = require('./lib/lorem');
exports.helpers =  require('./lib/helpers');
exports.definitions = require('./lib/definitions');

// Backward compatibility
exports.Name = exports.name;
exports.Address = exports.address;
exports.PhoneNumber = exports.phoneNumber;
exports.Internet = exports.internet;
exports.Company = exports.company;
exports.Lorem = exports.lorem;
exports.Helpers = exports.helpers;
