import { describe, expect, it } from 'vitest';
import type { LocaleDefinition } from '../src';
import { faker } from '../src';
import allLocales from '../src/locales';

// Remark: actual use of locales functionality is currently tested in all.functional.js test

describe('locale', () => {
  describe('setLocale()', () => {
    it('setLocale() changes faker.locale', () => {
      for (const locale in faker.locales) {
        faker.setLocale(locale);
        expect(faker.locale).toBe(locale);
      }
    });
  });

  for (const [localeName, moduleMap] of Object.entries(allLocales)) {
    describe(localeName, () => {
      for (const [
        moduleName,
        definitionMap,
      ] of Object.entries<LocaleDefinition>(moduleMap)) {
        if (moduleName === 'title' || moduleName === 'separator') {
          continue;
        }

        describe(moduleName, () => {
          for (const [definitionName, entries] of Object.entries(
            definitionMap
          )) {
            describe(definitionName, () => {
              if (Array.isArray(entries)) {
                it('should have no duplicate entries', () => {
                  const uniques = new Set(entries);
                  const duplications = entries.filter((entry) => {
                    if (uniques.has(entry)) {
                      uniques.delete(entry);
                      return false;
                    } else {
                      return true;
                    }
                  });
                  const uniqueDuplication = [...new Set(duplications)];

                  expect(
                    uniqueDuplication,
                    `Duplicated values are: [${uniqueDuplication.join(', ')}]`
                  ).toHaveLength(0);
                });
              }
            });
          }
        });
      }
    });
  }
});
