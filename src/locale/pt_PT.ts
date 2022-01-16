import Faker from '..';
import pt_PT from '../locales/pt_PT';
import en from '../locales/en';

const faker = new Faker({
  locale: 'pt_PT',
  localeFallback: 'en',
  locales: {
    pt_PT,
    en,
  },
});

export default faker;
