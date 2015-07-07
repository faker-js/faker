var faker = require('../lib');
faker.locale = "en";
faker.locales['en'] = require('../lib/locales/en');
module['exports'] = faker;
