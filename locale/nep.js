var faker = require('../lib');
faker.locale = "nep";
faker.locales['nep'] = require('../lib/locales/nep');
module['exports'] = faker;
