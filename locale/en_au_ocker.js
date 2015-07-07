var faker = require('../lib');
faker.locale = "en_au_ocker";
faker.locales['en_au_ocker'] = require('../lib/locales/en_au_ocker');
module['exports'] = faker;
