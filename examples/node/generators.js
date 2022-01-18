var faker = require('../../lib').faker;

faker.locale = 'en';

console.log(faker.fake('{{random.uuid}}, {{name.firstName}} {{name.suffix}}'));

return;

console.log(faker.fake('{{finance.currencyName}} - {{finance.amount}}'));

console.log(faker.fake('{{name.firstName}} {{name.lastName}}'));
