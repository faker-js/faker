#!/usr/bin/env node

var util = require('util');

var faker = require('../index');

faker.locale = "en";

console.log(faker.helpers.contextualCard());