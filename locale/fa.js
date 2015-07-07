var faker = require('../lib');
faker.locale = "fa";
faker.locales['fa'] = require('../lib/locales/fa');
module['exports'] = faker;
