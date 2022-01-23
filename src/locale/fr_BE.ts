import { Faker } from '..';
import fr_BE from '../locales/fr_BE';
import en from '../locales/en';

const faker = new Faker({
  locale: 'fr_BE',
  localeFallback: 'en',
  locales: {
    fr_BE,
    en,
  },
});

export = faker;
