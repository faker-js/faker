import Faker from '..';
import en_IND from '../locales/en_IND';
import en from '../locales/en';

const faker = new Faker({
  locale: 'en_IND',
  localeFallback: 'en',
  locales: {
    en_IND,
    en,
  },
});

export = faker;
