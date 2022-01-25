import { Faker } from '..';
import en from '../locales/en';
import lv from '../locales/lv';

const faker = new Faker({
  locale: 'lv',
  localeFallback: 'en',
  locales: {
    en,
    lv,
  },
});

export = faker;
