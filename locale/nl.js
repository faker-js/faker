var faker = require('../lib');
faker.locale = "nl";
faker.locales['nl'] = require('../lib/locales/nl');
module['exports'] = faker;
