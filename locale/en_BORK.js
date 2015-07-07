var faker = require('../lib');
faker.locale = "en_BORK";
faker.locales['en_BORK'] = require('../lib/locales/en_BORK');
module['exports'] = faker;
