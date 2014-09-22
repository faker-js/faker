#!/usr/bin/env node

var util = require('util');

var faker = require('../index');

// console.log(faker.definitions.name.suffix)

//util.puts(JSON.stringify(card));

faker.locale = "en";

var image = faker.image.image();
console.log(image);

return;


var first = faker.name.firstName(),
    last = faker.name.lastName();
    
console.log(first, last)
console.log(faker.name.findName(first, last))
console.log(faker.internet.userName(first, last))


return;
var phone_number = faker.phone.phoneNumber("(###) ###-####");
console.log(phone_number)
return;

console.log(faker.address.state_abbr())
return;

console.log(faker.helpers.contextualCard())

console.log(faker.helpers.createCard())

return;

console.log(faker.lorem.words())

console.log(faker.name.firstName() + " " + faker.name.lastName())
console.log(faker.name.firstName() + " " + faker.name.lastName())
console.log(faker.name.firstName() + " " + faker.name.lastName())
return;

/*
faker.locale = "zh_CN";

console.log(faker.name.firstName() + " " + faker.name.lastName())
console.log(faker.name.firstName() + " " + faker.name.lastName())
console.log(faker.name.firstName() + " " + faker.name.lastName())
*/



return;
var phone_number = faker.finance.transactionType();
console.log(phone_number)

console.log(faker.definitions)

var phone_number = faker.company.catchPhrase();

