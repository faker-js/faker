import Faker from '..';
import es from '../locales/es';
import en from '../locales/en';

const faker = new Faker({
  locale: 'es',
  localeFallback: 'en',
  locales: {
    es,
    en,
  },
});

export default faker;
