var util = require('util');

var Faker = require('../Faker');

var card = Faker.Helpers.createCard();

util.puts(JSON.stringify(card));

util.log(Faker.Finance.account(9))

util.log(Faker.Finance.name())

util.log(Faker.Finance.mask(4,true,true))

util.log(Faker.Finance.amount(1,100,2,'£'))



