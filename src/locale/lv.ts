import { Faker } from '..';
import lv from '../locales/lv';
import en from '../locales/en';

const faker = new Faker({
  locale: 'lv',
  localeFallback: 'en',
  locales: {
    lv,
    en,
  },
});

export = faker;
