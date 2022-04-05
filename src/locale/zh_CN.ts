/*
 * This file is automatically generated.
 * Run 'pnpm run generate:locales' to update.
 */

import { Faker } from '../faker';
import en from '../locales/en';
import zh_CN from '../locales/zh_CN';

const faker = new Faker({
  locale: 'zh_CN',
  localeFallback: 'en',
  locales: {
    zh_CN,
    en,
  },
});

export = faker;
