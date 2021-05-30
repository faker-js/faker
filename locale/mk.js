var Faker = require('../lib');
var faker = new Faker({ locale: 'mk', localeFallback: 'en' });
faker.locales['mk'] = require('../lib/locales/mk');
faker.locales['en'] = require('../lib/locales/en');
module['exports'] = faker;
