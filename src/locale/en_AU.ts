import Faker from '..';
import en_AU from '../locales/en_AU';
import en from '../locales/en';

const faker = new Faker({
  locale: 'en_AU',
  localeFallback: 'en',
  locales: {
    en_AU,
    en,
  },
});

export = faker;
