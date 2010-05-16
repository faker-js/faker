var sys = require('sys');

var definitions = require('../lib/definitions');

var Faker = require('../index');

var card = Faker.Helpers.createCard();

sys.puts(JSON.stringify(card));
