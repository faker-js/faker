import { Faker } from '..';
import uk from '../locales/uk';
import en from '../locales/en';

const faker = new Faker({
  locale: 'uk',
  localeFallback: 'en',
  locales: {
    uk,
    en,
  },
});

export default faker;
