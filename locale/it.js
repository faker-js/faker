var faker = require('../lib');
faker.locale = "it";
faker.locales['it'] = require('../lib/locales/it');
module['exports'] = faker;
