var faker = require('../lib');
faker.locale = "pl";
faker.locales['pl'] = require('../lib/locales/pl');
module['exports'] = faker;
