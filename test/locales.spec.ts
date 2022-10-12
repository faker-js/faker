import { describe, expect, it } from 'vitest';
import type { LocaleDefinition } from '../src';
import { faker } from '../src';
import allLocales from '../src/locales';
import './vitest-extensions';

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
              function testArraySample<T>(arr: T[]) {
                it('should not have duplicate entries', () => {
                  expect(arr).not.toContainDuplicates();
                });
              }

              if (Array.isArray(entries)) {
                testArraySample(entries);
              } else if (typeof entries === 'object') {
                for (const [key, samples] of Object.entries(entries)) {
                  if (Array.isArray(samples)) {
                    describe(key, () => {
                      testArraySample(samples);
                    });
                  } else {
                    it('cant be tested', () => {
                      expect(true).toBe(true);
                    });
                  }
                }
              } else {
                it('needs to be tested', () => {
                  expect(false).toBe(true);
                });
              }
            });
          }
        });
      }
    });
  }
});
