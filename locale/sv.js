var faker = require('../lib');
faker.locale = "sv";
faker.locales['sv'] = require('../lib/locales/sv');
module['exports'] = faker;
