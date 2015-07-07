var faker = require('../lib');
faker.locale = "de";
faker.locales['de'] = require('../lib/locales/de');
module['exports'] = faker;
