import { Faker } from '..';
import en_GH from '../locales/en_GH';
import en from '../locales/en';

const faker = new Faker({
  locale: 'en_GH',
  localeFallback: 'en',
  locales: {
    en_GH,
    en,
  },
});

export = faker;
