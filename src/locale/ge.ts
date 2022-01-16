import Faker from '..';
import ge from '../locales/ge';
import en from '../locales/en';

const faker = new Faker({
  locale: 'ge',
  localeFallback: 'en',
  locales: {
    ge,
    en,
  },
});

export = faker;
