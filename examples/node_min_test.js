#!/usr/bin/env node

var util = require('util');

var faker = require('../index');

var card = faker.helpers.createCard();

//util.puts(JSON.stringify(card));

console.log(card);