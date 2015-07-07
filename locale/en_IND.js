var faker = require('../lib');
faker.locale = "en_IND";
faker.locales['en_IND'] = require('../lib/locales/en_IND');
module['exports'] = faker;
