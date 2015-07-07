var faker = require('../lib');
faker.locale = "ja";
faker.locales['ja'] = require('../lib/locales/ja');
module['exports'] = faker;
