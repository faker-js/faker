/*
 * This file is automatically generated.
 * Run 'pnpm run generate:locales' to update.
 */

import { Faker } from '../faker';
import en from '../locales/en';
import fr_CH from '../locales/fr_CH';

export const faker = new Faker({
  locale: 'fr_CH',
  localeFallback: 'en',
  locales: {
    fr_CH,
    en,
  },
});
