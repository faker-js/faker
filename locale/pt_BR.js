var faker = require('../lib');
faker.locale = "pt_BR";
faker.locales['pt_BR'] = require('../lib/locales/pt_BR');
module['exports'] = faker;
