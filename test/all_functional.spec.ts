import { describe, expect, it } from 'vitest';
import { faker } from '../src';

const IGNORED_MODULES = [
  'locales',
  'locale',
  'localeFallback',
  'definitions',
  'fake',
  'helpers',
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
    companySuffix: ['az'],
  },
  location: {
    cityPrefix: ['pt_BR', 'pt_PT'],
    citySuffix: ['pt_PT'],
    state: ['az', 'cz', 'nb_NO', 'sk'],
    stateAbbr: ['cz', 'sk'],
  },
  person: {
    prefix: ['az', 'id_ID', 'ru'],
    suffix: ['az', 'it', 'mk', 'pt_PT', 'ru'],
  },
};

// @ts-expect-error: ignore also the aliases
BROKEN_LOCALE_METHODS.name = BROKEN_LOCALE_METHODS.person;
// @ts-expect-error: ignore also the aliases
BROKEN_LOCALE_METHODS.address = BROKEN_LOCALE_METHODS.location;

function isWorkingLocaleForMethod(
  mod: string,
  meth: string,
  locale: string
): boolean {
  return (BROKEN_LOCALE_METHODS[mod]?.[meth] ?? []).indexOf(locale) === -1;
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
            it(`${meth}()`, () => {
              faker.locale = locale;
              // TODO ST-DDT 2022-03-28: Use random seed once there are no more failures
              faker.seed(1);
              const result = faker.helpers.fake(`{{${module}.${meth}}}`);

              expect(result).toBeTypeOf('string');
            });
          });
        });
      });
    });
  }
});
