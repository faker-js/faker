import { Faker } from '..';
import es_MX from '../locales/es_MX';
import en from '../locales/en';

const faker = new Faker({
  locale: 'es_MX',
  localeFallback: 'en',
  locales: {
    es_MX,
    en,
  },
});

export default faker;
