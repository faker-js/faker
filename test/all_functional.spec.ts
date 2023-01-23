import { describe, expect, it } from 'vitest';
import { faker } from '../src';
import type { KnownLocale } from '../src/locales';

const IGNORED_MODULES = [
  'locales',
  'definitions',
  'helpers',
  '_locale',
  '_localeFallback',
  '_mersenne',
];

function isTestableModule(mod: string) {
  return IGNORED_MODULES.indexOf(mod) === -1;
}

function isMethodOf(mod: string) {
  return (meth: string) => typeof faker[mod][meth] === 'function';
}

const BROKEN_LOCALE_METHODS = {
  // TODO ST-DDT 2022-03-28: these are TODOs (usually broken locale files)
  company: {
    suffixes: ['az'],
    companySuffix: ['az'],
  },
  location: {
    state: ['az', 'cz', 'nb_NO', 'sk'],
    stateAbbr: ['cz', 'sk'],
  },
  string: {
    fromCharacters: '*',
  },
  person: {
    prefix: ['az', 'id_ID', 'ru', 'zh_CN', 'zh_TW'],
    suffix: ['az', 'it', 'mk', 'pt_PT', 'ru'],
  },
} satisfies Record<string, Record<string, '*' | KnownLocale[]>>;

function isWorkingLocaleForMethod(
  mod: string,
  meth: string,
  locale: string
): boolean {
  const broken = BROKEN_LOCALE_METHODS[mod]?.[meth] ?? [];
  return broken !== '*' && !broken.includes(locale);
}

// Basic smoke tests to make sure each method is at least implemented and returns a value.

function modulesList(): { [module: string]: string[] } {
  const modules = Object.keys(faker)
    .sort()
    .filter(isTestableModule)
    .reduce((result, mod) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const methods = Object.keys(faker[mod]).filter(isMethodOf(mod));
      if (methods.length) {
        result[mod] = methods;
      } else {
        console.log(`Skipping ${mod} - No testable methods`);
      }

      return result;
    }, {});

  return modules;
}

const modules = modulesList();

describe('BROKEN_LOCALE_METHODS test', () => {
  it('should not contain obsolete configuration (modules)', () => {
    const existingModules = Object.keys(modules);
    const configuredModules = Object.keys(BROKEN_LOCALE_METHODS ?? {});
    const obsoleteModules = configuredModules.filter(
      (module) => !existingModules.includes(module)
    );

    expect(obsoleteModules, 'No obsolete configuration').toEqual([]);
  });

  Object.keys(modules).forEach((module) => {
    describe(module, () => {
      it('should not contain obsolete configuration (methods)', () => {
        const existingMethods = modules[module];
        const configuredMethods = Object.keys(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          BROKEN_LOCALE_METHODS[module] ?? {}
        );
        const obsoleteMethods = configuredMethods.filter(
          (method) => !existingMethods.includes(method)
        );

        expect(obsoleteMethods, 'No obsolete configuration').toEqual([]);
      });
    });
  });
});

describe('functional tests', () => {
  for (const locale in faker.locales) {
    describe(locale, () => {
      Object.keys(modules).forEach((module) => {
        describe(module, () => {
          modules[module].forEach((meth) => {
            const testAssertion = () => {
              faker.locale = locale;
              // TODO ST-DDT 2022-03-28: Use random seed once there are no more failures
              faker.seed(1);
              const result = faker[module][meth]();

              if (meth === 'boolean') {
                expect(result).toBeTypeOf('boolean');
              } else {
                expect(result).toBeTruthy();
                expect(result).not.toEqual([]);
              }
            };

            if (isWorkingLocaleForMethod(module, meth, locale)) {
              it(`${meth}()`, testAssertion);
            } else {
              // TODO ST-DDT 2022-03-28: Remove once there are no more failures
              // We expect a failure here to ensure we remove the exclusions when fixed
              it.fails(`${meth}()`, testAssertion);
            }
          });
        });
      });
    });
  }
});

describe('faker.helpers.fake functional tests', () => {
  for (const locale in faker.locales) {
    describe(locale, () => {
      Object.keys(modules).forEach((module) => {
        describe(module, () => {
          modules[module].forEach((meth) => {
            const testAssertion = () => {
              faker.locale = locale;
              // TODO ST-DDT 2022-03-28: Use random seed once there are no more failures
              faker.seed(1);
              const result = faker.helpers.fake(`{{${module}.${meth}}}`);

              expect(result).toBeTypeOf('string');
              expect(result).not.toBe('');
              expect(result).not.toBe('null');
              expect(result).not.toBe('undefined');
            };

            if (isWorkingLocaleForMethod(module, meth, locale)) {
              it(`${meth}()`, testAssertion);
            } else {
              // TODO ST-DDT 2022-03-28: Remove once there are no more failures
              // We expect a failure here to ensure we remove the exclusions when fixed
              it.fails(`${meth}()`, testAssertion);
            }
          });
        });
      });
    });
  }
});
