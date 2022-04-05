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

function isTestableModule(mod: string) {
  return IGNORED_MODULES.indexOf(mod) === -1;
}

function isMethodOf(mod: string) {
  return (meth: string) => typeof faker[mod][meth] === 'function';
}

const allLocales = [
  'af_ZA',
  'ar',
  'az',
  'cz',
  'de',
  'de_AT',
  'de_CH',
  'el',
  'en',
  'en_AU',
  'en_AU_ocker',
  'en_BORK',
  'en_CA',
  'en_GB',
  'en_GH',
  'en_IE',
  'en_IND',
  'en_NG',
  'en_US',
  'en_ZA',
  'es',
  'es_MX',
  'fa',
  'fi',
  'fr',
  'fr_BE',
  'fr_CA',
  'fr_CH',
  'ge',
  'he',
  'hr',
  'hy',
  'id_ID',
  'it',
  'ja',
  'ko',
  'lv',
  'mk',
  'nb_NO',
  'ne',
  'nl',
  'nl_BE',
  'pl',
  'pt_BR',
  'pt_PT',
  'ro',
  'ru',
  'sk',
  'sv',
  'tr',
  'uk',
  'ur',
  'vi',
  'zh_CN',
  'zh_TW',
  'zu_ZA',
];

const BROKEN_LOCALE_METHODS = {
  // TODO ST-DDT 2022-03-28: these are TODOs (usually broken locale files)
  address: {
    city: ['pt_PT'],
    cityPrefix: ['pt_BR', 'pt_PT'],
    citySuffix: ['pt_PT'],
    state: ['az', 'cz', 'sk'],
    stateAbbr: ['cz', 'sk'],
    streetPrefix: [
      'af_ZA',
      'az',
      'cz',
      'de',
      'de_AT',
      'de_CH',
      'el',
      'en',
      'en_AU',
      'en_AU_ocker',
      'en_BORK',
      'en_CA',
      'en_GB',
      'en_IE',
      'en_IND',
      'en_NG',
      'en_US',
      'en_ZA',
      'es',
      'es_MX',
      'fi',
      'fr_CA',
      'fr_CH',
      'ge',
      'he',
      'hr',
      'hy',
      'it',
      'ja',
      'ko',
      'lv',
      'mk',
      'ne',
      'nl',
      'nl_BE',
      'pt_BR',
      'ro',
      'ru',
      'sk',
      'tr',
      'ur',
      'vi',
      'zh_CN',
      'zh_TW',
      'zu_ZA',
    ],
  },
  company: {
    companySuffix: ['az'],
  },
  name: {
    jobArea: ['ar', 'fr', 'fr_BE'],
    jobDescriptor: ['ar', 'fr', 'fr_BE'],
    jobTitle: ['ar', 'fr', 'fr_BE', 'ur'],
    jobType: ['ur'],
    prefix: ['az', 'id_ID', 'ru'],
    suffix: ['az', 'it', 'mk', 'pt_PT', 'ru'],
    title: ['ar', 'fr', 'fr_BE', 'ur'],
  },
  random: {
    // we expect all locales to fail since we do not pass any array to pick values from
    arrayElement: [...allLocales],
    arrayElements: [...allLocales],
    words: ['ur'],
  },
  system: {
    commonFileName: ['ur'],
    fileName: ['ur'],
  },
};

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

describe('faker.fake functional tests', () => {
  for (const locale in faker.locales) {
    describe(locale, () => {
      Object.keys(modules).forEach((module) => {
        describe(module, () => {
          modules[module].forEach((meth) => {
            const testAssertion = () => {
              faker.locale = locale;
              // TODO ST-DDT 2022-03-28: Use random seed once there are no more failures
              faker.seed(1);
              const result = faker.fake(`{{${module}.${meth}}}`);

              expect(result).toBeTypeOf('string');
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
