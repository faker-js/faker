var faker = require('../lib');
faker.locale = "fr";
faker.locales['fr'] = require('../lib/locales/fr');
module['exports'] = faker;
