import { Faker } from '..';
import sv from '../locales/sv';
import en from '../locales/en';

const faker = new Faker({
  locale: 'sv',
  localeFallback: 'en',
  locales: {
    sv,
    en,
  },
});

export = faker;
