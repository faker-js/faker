var faker = require('../../index');

faker.locale = "en";



console.log(faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'));


console.log(faker.fake('{{finance.currencyName}} - {{finance.amount}}'));


console.log(faker.fake('{{name.firstName}} {{name.lastName}}'));