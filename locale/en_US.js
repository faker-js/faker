var faker = require('../lib');
faker.locale = "en_US";
faker.locales['en_US'] = require('../lib/locales/en_US');
module['exports'] = faker;
