import { Faker } from '..';
import nl from '../locales/nl';
import en from '../locales/en';

const faker = new Faker({
  locale: 'nl',
  localeFallback: 'en',
  locales: {
    nl,
    en,
  },
});

export = faker;
