var sys = require('sys');

var definitions = require('./lib/definitions');

var Faker = {};

Faker.Name = require('./lib/name');
Faker.Address = require('./lib/address');

var Helper = require('helper');;

sys.puts(JSON.stringify(Faker.Name.first_name()));
sys.puts(JSON.stringify(Faker.Name.findName()));
sys.puts(JSON.stringify(Faker.Address.zip_code()));
sys.puts(JSON.stringify(Faker.Address.secondaryAddress()));
sys.puts(JSON.stringify(Faker.Address.city()));
sys.puts(JSON.stringify(Faker.Address.streetName()));
sys.puts(JSON.stringify(Faker.Address.streetAddress()));
sys.puts(JSON.stringify(Faker.Address.street_address(true)));


