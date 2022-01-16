import Faker from '..';
import sk from '../locales/sk';
import en from '../locales/en';

const faker = new Faker({
  locale: 'sk',
  localeFallback: 'en',
  locales: {
    sk,
    en,
  },
});

export = faker;
