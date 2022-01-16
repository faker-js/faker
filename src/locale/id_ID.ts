import Faker from '..';
import id_ID from '../locales/id_ID';
import en from '../locales/en';

const faker = new Faker({
  locale: 'id_ID',
  localeFallback: 'en',
  locales: {
    id_ID,
    en,
  },
});

export default faker;
