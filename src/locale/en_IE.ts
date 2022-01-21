import { Faker } from '..';
import en_IE from '../locales/en_IE';
import en from '../locales/en';

const faker = new Faker({
  locale: 'en_IE',
  localeFallback: 'en',
  locales: {
    en_IE,
    en,
  },
});

export default faker;
