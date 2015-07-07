var faker = require('../lib');
faker.locale = "en_GB";
faker.locales['en_GB'] = require('../lib/locales/en_GB');
module['exports'] = faker;
