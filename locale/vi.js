var faker = require('../lib');
faker.locale = "vi";
faker.locales['vi'] = require('../lib/locales/vi');
module['exports'] = faker;
