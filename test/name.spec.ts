import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../dist/cjs';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      firstName: {
        noArgs: 'Garnett',
      },
      lastName: {
        noArgs: 'Hintz',
      },
      middleName: {
        noArgs: 'b',
      },
      findName: {
        noArgs: 'Lorene Deckow',
      },
      jobTitle: {
        noArgs: 'Regional Data Representative',
      },
      gender: {
        noArgs: 'Cis',
      },
      prefix: {
        noArgs: 'Mrs.',
      },
      suffix: {
        noArgs: 'III',
      },
      title: {
        noArgs: 'Regional Data Representative',
      },
      jobDescriptor: {
        noArgs: 'Regional',
      },
      jobArea: {
        noArgs: 'Identity',
      },
      jobType: {
        noArgs: 'Coordinator',
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      firstName: {
        noArgs: 'Devyn',
      },
      lastName: {
        noArgs: 'Gibson',
      },
      middleName: {
        noArgs: 'a',
      },
      findName: {
        noArgs: 'Marilyn Effertz',
      },
      jobTitle: {
        noArgs: 'Future Infrastructure Liaison',
      },
      gender: {
        noArgs: 'Two* person',
      },
      prefix: {
        noArgs: 'Mrs.',
      },
      suffix: {
        noArgs: 'I',
      },
      title: {
        noArgs: 'Future Infrastructure Liaison',
      },
      jobDescriptor: {
        noArgs: 'Future',
      },
      jobArea: {
        noArgs: 'Functionality',
      },
      jobType: {
        noArgs: 'Engineer',
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      firstName: {
        noArgs: 'Tito',
      },
      lastName: {
        noArgs: 'Ward',
      },
      middleName: {
        noArgs: 'c',
      },
      findName: {
        noArgs: 'Darrel Sanford',
      },
      jobTitle: {
        noArgs: 'Chief Division Agent',
      },
      gender: {
        noArgs: 'Transexual Person',
      },
      prefix: {
        noArgs: 'Dr.',
      },
      suffix: {
        noArgs: 'DVM',
      },
      title: {
        noArgs: 'Chief Division Agent',
      },
      jobDescriptor: {
        noArgs: 'Chief',
      },
      jobArea: {
        noArgs: 'Factors',
      },
      jobType: {
        noArgs: 'Representative',
      },
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'firstName',
  'lastName',
  'middleName',
  'findName',
  'jobTitle',
  'gender',
  'prefix',
  'suffix',
  'title',
  'jobDescriptor',
  'jobArea',
  'jobType',
];

describe('name', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.name[functionName]();
          expect(actual).toEqual(expectations[functionName].noArgs);
        });
      }
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${faker.seedValue}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('firstName()', () => {
        it('should return a random first name', () => {
          const first_name = faker.name.firstName();

          expect(typeof first_name).toBe('string');
          expect(first_name.length).greaterThan(0);
        });

        it('should return a gender-specific first name when passed a number', () => {
          let name = faker.name.firstName(0);
          expect(faker.definitions.name.male_first_name).toContain(name);
          name = faker.name.firstName(1);
          expect(faker.definitions.name.female_first_name).toContain(name);
        });

        // TODO @Shinigami92 2022-01-30: There is a bug: https://github.com/faker-js/faker/issues/373
        it.todo(
          'should return a gender-specific first name when passed a string',
          () => {
            let name = faker.name.firstName('male');
            expect(faker.definitions.name.male_first_name).toContain(name);
            name = faker.name.firstName('female');
            expect(faker.definitions.name.female_first_name).toContain(name);
          }
        );
      });

      describe('lastName()', () => {
        it('should return a random last name', () => {
          const last_name = faker.name.lastName();

          expect(typeof last_name).toBe('string');
          expect(last_name.length).greaterThan(0);
        });

        // TODO @Shinigami92 2022-01-30: There is a bug: https://github.com/faker-js/faker/issues/373
        it.todo(
          'should return a gender-specific last name when passed a number',
          () => {
            let name = faker.name.lastName(0);
            expect(faker.definitions.name.male_last_name).toContain(name);
            name = faker.name.lastName(1);
            expect(faker.definitions.name.female_last_name).toContain(name);
          }
        );

        // TODO @Shinigami92 2022-01-30: There is a bug: https://github.com/faker-js/faker/issues/373
        it.todo(
          'should return a gender-specific last name when passed a string',
          () => {
            let name = faker.name.lastName('male');
            expect(faker.definitions.name.male_last_name).toContain(name);
            name = faker.name.lastName('female');
            expect(faker.definitions.name.female_last_name).toContain(name);
          }
        );
      });

      describe('middleName()', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a random middle name', () => {
          const middle_name = faker.name.middleName();

          expect(typeof middle_name).toBe('string');
          expect(middle_name.length).greaterThan(0);
        });

        it('should return a gender-specific middle name when passed a number', () => {
          faker.locale = 'uk';

          let name = faker.name.middleName(0);
          expect(faker.definitions.name.male_middle_name).toContain(name);
          name = faker.name.middleName(1);
          expect(faker.definitions.name.female_middle_name).toContain(name);
        });

        // TODO @Shinigami92 2022-01-30: There is a bug: https://github.com/faker-js/faker/issues/373
        it.todo(
          'should return a gender-specific middle name when passed a string',
          () => {
            faker.locale = 'uk';

            let name = faker.name.middleName('male');
            expect(faker.definitions.name.male_middle_name).toContain(name);
            name = faker.name.middleName('female');
            expect(faker.definitions.name.female_middle_name).toContain(name);
          }
        );
      });

      describe.skip('findName()', () => {
        it('usually returns a first name and last name', () => {
          const name = faker.name.findName();

          expect(name).toBeTruthy();

          const parts = name.split(' ');

          expect(parts).toHaveLength(2);
        });

        it('occasionally returns a first name and last name with a prefix', () => {
          const name = faker.name.findName();
          const parts = name.split(' ');

          expect(parts.length).greaterThanOrEqual(3);
        });

        it('occasionally returns a male full name with a prefix', () => {
          const name = faker.name.findName();

          expect(name).toBe('Clifford Champlin');
        });

        it('occasionally returns a first name and last name with a suffix', () => {
          const name = faker.name.findName();
          const parts = name.split(' ');

          expect(parts.length).greaterThanOrEqual(3);
          expect(parts[parts.length - 1]).toBe('PhD');
        });

        it.todo(
          'needs to work with specific locales and respect the fallbacks',
          () => {
            faker.locale = 'en_US';
            // this will throw if this is broken
            const name = faker.name.findName();
            // TODO @Shinigami92 2022-01-20: This test doesn't check anything
          }
        );
      });

      describe.skip('jobTitle()', () => {
        it('should return a job title consisting of a descriptor, area, and type', () => {
          const jobTitle = faker.name.jobTitle();

          expect(typeof jobTitle).toBe('string');
        });
      });

      describe.skip('gender()', () => {
        // ...
      });

      describe.skip('prefix()', () => {
        describe('when using a locale with gender specific name prefixes', () => {
          let oldLocale: string;

          beforeEach(() => {
            oldLocale = faker.locale;
            faker.locale = 'TEST';

            faker.locales.TEST = {
              title: 'Test',
              name: {
                male_prefix: ['Mp'],
                female_prefix: ['Fp'],
              },
            };
          });

          afterEach(() => {
            faker.locale = oldLocale;
            delete faker.locales.TEST;
          });

          it('should return male prefix', () => {
            const prefix = faker.name.prefix(0);
            expect(prefix).toBe('Mp');
          });

          it('should return female prefix', () => {
            const prefix = faker.name.prefix(1);
            expect(prefix).toBe('Fp');
          });

          it('should return either prefix', () => {
            const prefix = faker.name.prefix();
            expect(['Mp', 'Fp']).toContain(prefix);
          });
        });

        describe('when using a locale without gender specific name prefixes', () => {
          let oldLocale: string;

          beforeEach(() => {
            oldLocale = faker.locale;
            faker.locale = 'TEST';

            faker.locales.TEST = {
              title: 'Test',
              name: {
                prefix: ['P'],
              },
            };
          });

          afterEach(() => {
            faker.locale = oldLocale;
            delete faker.locales.TEST;
          });

          it('should return a prefix', () => {
            const prefix = faker.name.prefix();

            expect(prefix).toBe('P');
          });
        });
      });

      describe.skip('suffix()', () => {
        // ...
      });

      describe.skip('title()', () => {
        it('should return a random title', () => {
          const title = faker.name.title();

          expect(typeof title).toBe('string');
          expect(title.length).greaterThan(0);
        });
      });

      describe.skip('jobDescriptor()', () => {
        // ...
      });

      describe.skip('jobArea()', () => {
        // ...
      });

      describe.skip('jobType()', () => {
        // ...
      });
    }
  });
});
