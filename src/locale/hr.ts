import Faker from '..';
import hr from '../locales/hr';
import en from '../locales/en';

const faker = new Faker({
  locale: 'hr',
  localeFallback: 'en',
  locales: {
    hr,
    en,
  },
});

export = faker;
