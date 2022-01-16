import Faker from '..';
import en_NG from '../locales/en_NG';
import en from '../locales/en';

const faker = new Faker({
  locale: 'en_NG',
  localeFallback: 'en',
  locales: {
    en_NG,
    en,
  },
});

export = faker;
