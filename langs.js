const { faker } = require('@faker-js/faker');
const validator = require('validator');
let allLocales = Object.keys(faker.locales);
for (let l of allLocales) {
  faker.locale = l;
  for (let i = 0; i < 1000; i++) {
    let email = faker.internet.email();
    if (!validator.isEmail(email) || email.split('@')[0].length > 50) {
      console.log(l, email);
    }
  }
}
