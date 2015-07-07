var faker = require('../lib');
faker.locale = "de_CH";
faker.locales['de_CH'] = require('../lib/locales/de_CH');
module['exports'] = faker;
