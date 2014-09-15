var util = require('util');

var definitions = require('../lib/definitions');

var faker = require('../index');

var card = faker.helpers.createCard();

util.puts(JSON.stringify(card));
