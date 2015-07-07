var faker = require('../lib');
faker.locale = "nb_NO";
faker.locales['nb_NO'] = require('../lib/locales/nb_NO');
module['exports'] = faker;
