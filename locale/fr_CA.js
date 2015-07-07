var faker = require('../lib');
faker.locale = "fr_CA";
faker.locales['fr_CA'] = require('../lib/locales/fr_CA');
module['exports'] = faker;
