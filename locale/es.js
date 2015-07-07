var faker = require('../lib');
faker.locale = "es";
faker.locales['es'] = require('../lib/locales/es');
module['exports'] = faker;
