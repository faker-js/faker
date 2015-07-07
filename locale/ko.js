var faker = require('../lib');
faker.locale = "ko";
faker.locales['ko'] = require('../lib/locales/ko');
module['exports'] = faker;
