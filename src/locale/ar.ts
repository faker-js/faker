import { Faker } from '..';
import ar from '../locales/ar';
import en from '../locales/en';

const faker = new Faker({
  locale: 'ar',
  localeFallback: 'en',
  locales: {
    ar,
    en,
  },
});

export = faker;
