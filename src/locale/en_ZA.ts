/*
 * This file is automatically generated.
 * Run 'pnpm run generate:locales' to update.
 */

import { Faker } from '../faker';
import base from '../locales/base';
import en from '../locales/en';
import en_ZA from '../locales/en_ZA';

/**
 * The faker instance for the `en_ZA` locale.
 *
 * - Language: English (South Africa)
 * - Endonym: English (South Africa)
 *
 * This instance uses the following locales internally (in descending precedence):
 *
 * - `en_ZA`
 * - `en`
 * - `base`
 */
export const faker = new Faker({
  locale: [en_ZA, en, base],
});
