var faker = require('../lib');
faker.locale = "uk";
faker.locales['uk'] = require('../lib/locales/uk');
module['exports'] = faker;
