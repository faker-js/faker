var faker = require('../lib');
faker.locale = "zh_TW";
faker.locales['zh_TW'] = require('../lib/locales/zh_TW');
module['exports'] = faker;
