let faker = require('./build/build/faker');
faker.locale = 'ru';

console.log(faker.random.words(10));