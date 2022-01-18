import { Faker } from '..';
import ja from '../locales/ja';
import en from '../locales/en';

const faker = new Faker({
  locale: 'ja',
  localeFallback: 'en',
  locales: {
    ja,
    en,
  },
});

export = faker;
