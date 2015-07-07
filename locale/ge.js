var faker = require('../lib');
faker.locale = "ge";
faker.locales['ge'] = require('../lib/locales/ge');
module['exports'] = faker;
