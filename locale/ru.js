var faker = require('../lib');
faker.locale = "ru";
faker.locales['ru'] = require('../lib/locales/ru');
module['exports'] = faker;
