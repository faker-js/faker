import Faker from '..';
import en_CA from '../locales/en_CA';
import en from '../locales/en';

const faker = new Faker({
  locale: 'en_CA',
  localeFallback: 'en',
  locales: {
    en_CA,
    en,
  },
});

export = faker;
