import { Faker } from '..';
import az from '../locales/az';
import en from '../locales/en';

const faker = new Faker({
  locale: 'az',
  localeFallback: 'en',
  locales: {
    az,
    en,
  },
});

export default faker;
