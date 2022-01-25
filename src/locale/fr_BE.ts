import { Faker } from '..';
import en from '../locales/en';
import fr_BE from '../locales/fr_BE';

const faker = new Faker({
  locale: 'fr_BE',
  localeFallback: 'en',
  locales: {
    en,
    fr_BE,
  },
});

export = faker;
