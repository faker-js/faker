var faker = require('../lib');
faker.locale = "sk";
faker.locales['sk'] = require('../lib/locales/sk');
module['exports'] = faker;
