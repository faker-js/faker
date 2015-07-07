var faker = require('../lib');
faker.locale = "de_AT";
faker.locales['de_AT'] = require('../lib/locales/de_AT');
module['exports'] = faker;
