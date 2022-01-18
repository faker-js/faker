import { Faker } from '..';
import de from '../locales/de';
import en from '../locales/en';

const faker = new Faker({
  locale: 'de',
  localeFallback: 'en',
  locales: {
    de,
    en,
  },
});

export = faker;
