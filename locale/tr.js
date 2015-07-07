var faker = require('../lib');
faker.locale = "tr";
faker.locales['tr'] = require('../lib/locales/tr');
module['exports'] = faker;
