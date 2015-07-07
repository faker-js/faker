var faker = require('../lib');
faker.locale = "en_AU";
faker.locales['en_AU'] = require('../lib/locales/en_AU');
module['exports'] = faker;
