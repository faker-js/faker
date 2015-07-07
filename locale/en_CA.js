var faker = require('../lib');
faker.locale = "en_CA";
faker.locales['en_CA'] = require('../lib/locales/en_CA');
module['exports'] = faker;
