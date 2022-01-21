import { Faker } from '..';
import de_AT from '../locales/de_AT';
import en from '../locales/en';

const faker = new Faker({
  locale: 'de_AT',
  localeFallback: 'en',
  locales: {
    de_AT,
    en,
  },
});

export default faker;
