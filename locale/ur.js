var Faker = require('../lib');
var faker = new Faker({ locale: 'ur', localeFallback: 'en' });
faker.locales['ur'] = require('../lib/locales/ur');
faker.locales['en'] = require('../lib/locales/en');

module['exports'] = faker;
