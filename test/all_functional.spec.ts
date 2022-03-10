import { describe, expect, it } from 'vitest';
import { faker } from '../src';

const IGNORED_MODULES = [
  'locales',
  'locale',
  'localeFallback',
  'definitions',
  'fake',
  'helpers',
  'mersenne',
];

const IGNORED_METHODS = {
  system: ['directoryPath', 'filePath'], // these are TODOs
};

function isTestableModule(mod: string) {
  return IGNORED_MODULES.indexOf(mod) === -1;
}

function isMethodOf(mod: string) {
  return (meth: string) => typeof faker[mod][meth] === 'function';
}

function isTestableMethod(mod: string) {
  return (meth: string) =>
    !(mod in IGNORED_METHODS && IGNORED_METHODS[mod].indexOf(meth) >= 0);
}

function both(
  pred1: (meth: string) => boolean,
  pred2: (meth: string) => boolean
): (meth: string) => boolean {
  return (value) => pred1(value) && pred2(value);
}

// Basic smoke tests to make sure each method is at least implemented and returns a value.

function modulesList(): { [module: string]: string[] } {
  const modules = Object.keys(faker)
    .filter(isTestableModule)
    .reduce((result, mod) => {
      result[mod] = Object.keys(faker[mod]).filter(
        both(isMethodOf(mod), isTestableMethod(mod))
      );
      return result;
    }, {});

  return modules;
}

const modules = modulesList();

describe('functional tests', () => {
  for (const locale in faker.locales) {
    describe(locale, () => {
      // TODO: Enable after https://github.com/faker-js/faker/pull/269
      //it('title', () => {
      //  faker.locale = locale;
      //  expect(faker.definitions.title).toBe(faker.locales[locale].title);
      //});

      Object.keys(modules).forEach((module) => {
        describe(module, () => {
          // if there is nothing to test, create a dummy test so the test runner doesn't complain
          if (Object.keys(modules[module]).length === 0) {
            it.todo(`${module} was empty`);
          }

          modules[module].forEach((meth) => {
            it(meth + '()', () => {
              faker.locale = locale;
              const result = faker[module][meth]();
              if (meth === 'boolean') {
                expect(result).toBeTypeOf('boolean');
              } else {
                expect(result).toBeTruthy();
              }
            });
          });
        });
      });
    });
  }
});

describe('faker.fake functional tests', () => {
  for (const locale in faker.locales) {
    describe(locale, () => {
      faker.locale = locale;
      faker.seed(1);
      Object.keys(modules).forEach((module) => {
        describe(module, () => {
          // if there is nothing to test, create a dummy test so the test runner doesn't complain
          if (Object.keys(modules[module]).length === 0) {
            it.todo(`${module} was empty`);
          }

          modules[module].forEach((meth) => {
            it(meth + '()', () => {
              const result = faker.fake('{{' + module + '.' + meth + '}}');
              // just make sure any result is returned
              // an undefined result usually means an error
              expect(result).toBeTypeOf('string');
              // if (meth === 'boolean') {
              //   expect(result).toBeTypeOf('boolean');
              // } else {
              //   expect(result).toBeTruthy();
              // }
            });
          });
        });
      });
    });
  }
});
