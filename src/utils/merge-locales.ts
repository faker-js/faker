import type { LocaleDefinition } from '..';

/**
 * Merges the given locales into one locale.
 * The locales are merged in the order they are given.
 * The first locale that provides a entry for a category will be used for that.
 * Mutating the category entries in the returned locale will also mutate the entries in the respective source locale.
 *
 * @param locales The locales to merge.
 * @returns The newly merged locale.
 *
 * @example
 * const locale = mergeLocales([ de_CH, de, en ]);
 */
export function mergeLocales(locales: LocaleDefinition[]): LocaleDefinition {
  const merged: LocaleDefinition = {} as LocaleDefinition;

  for (const locale of locales) {
    for (const key in locale) {
      if (merged[key] === undefined) {
        if (typeof locale[key] === 'object') {
          merged[key] = { ...locale[key] };
        } else {
          merged[key] = locale[key];
        }
      } else {
        if (typeof locale[key] === 'object') {
          merged[key] = { ...locale[key], ...merged[key] };
        } else {
          // Do nothing
        }
      }
    }
  }

  return merged;
}
