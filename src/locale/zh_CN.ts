import Faker from '..';
import zh_CN from '../locales/zh_CN';
import en from '../locales/en';

const faker = new Faker({
  locale: 'zh_CN',
  localeFallback: 'en',
  locales: {
    zh_CN,
    en,
  },
});

export = faker;
