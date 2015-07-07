var faker = require('../lib');
faker.locale = "zh_CN";
faker.locales['zh_CN'] = require('../lib/locales/zh_CN');
module['exports'] = faker;
