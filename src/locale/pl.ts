import { Faker } from '..';
import pl from '../locales/pl';
import en from '../locales/en';

const faker = new Faker({
  locale: 'pl',
  localeFallback: 'en',
  locales: {
    pl,
    en,
  },
});

export = faker;
