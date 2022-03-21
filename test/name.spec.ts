import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

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

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seedValue
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('firstName()', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a random first name', () => {
          const first_name = faker.name.firstName();

          expect(first_name).toBeTypeOf('string');
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
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a random last name', () => {
          const last_name = faker.name.lastName();

          expect(last_name).toBeTypeOf('string');
          expect(last_name.length).greaterThan(0);
        });

        it('should return a gender-specific last name when passed a number', () => {
          faker.locale = 'az';

          let name = faker.name.lastName(0);
          expect(faker.definitions.name.male_last_name).toContain(name);
          name = faker.name.lastName(1);
          expect(faker.definitions.name.female_last_name).toContain(name);
        });

        // TODO @Shinigami92 2022-01-30: There is a bug: https://github.com/faker-js/faker/issues/373
        it.todo(
          'should return a gender-specific last name when passed a string',
          () => {
            faker.locale = 'az';

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

          expect(middle_name).toBeTypeOf('string');
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

      describe('findName()', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a name with firstName and lastName', () => {
          const fullName = faker.name.findName();

          expect(fullName).toBeTypeOf('string');
          expect(fullName).toContain(' ');
        });

        it('should return a male gender-specific name with firstName and lastName', () => {
          faker.locale = 'mk';

          const male_specific = [
            ...faker.definitions.name.male_prefix,
            ...faker.definitions.name.male_first_name,
            ...faker.definitions.name.male_last_name,
            ...faker.definitions.name.suffix,
          ];

          const fullName = faker.name.findName(undefined, undefined, 0);

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(male_specific).toContain(part);
          }
        });

        it('should return a female gender-specific name with firstName and lastName', () => {
          faker.locale = 'mk';

          const female_specific = [
            ...faker.definitions.name.female_prefix,
            ...faker.definitions.name.female_first_name,
            ...faker.definitions.name.female_last_name,
            ...faker.definitions.name.suffix,
          ];

          const fullName = faker.name.findName(undefined, undefined, 1);

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(female_specific).toContain(part);
          }
        });

        it('should return a male gender-specific name with given firstName and lastName', () => {
          faker.locale = 'mk';

          const male_specific = [
            ...faker.definitions.name.male_prefix,
            'firstName',
            'lastName',
            ...faker.definitions.name.suffix,
          ];

          const fullName = faker.name.findName('firstName', 'lastName', 0);

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(male_specific).toContain(part);
          }
        });

        it('should return a female gender-specific name with given firstName and lastName', () => {
          faker.locale = 'mk';

          const male_specific = [
            ...faker.definitions.name.female_prefix,
            'firstName',
            'lastName',
            ...faker.definitions.name.suffix,
          ];

          const fullName = faker.name.findName('firstName', 'lastName', 1);

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(male_specific).toContain(part);
          }
        });
      });

      describe('jobTitle()', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a job title consisting of a descriptor, area, and type', () => {
          const jobTitle = faker.name.jobTitle();

          expect(jobTitle).toBeTypeOf('string');

          const [descriptor, level, job] = jobTitle.split(' ');

          expect(faker.definitions.name.title.descriptor).toContain(descriptor);
          expect(faker.definitions.name.title.level).toContain(level);
          expect(faker.definitions.name.title.job).toContain(job);
        });
      });

      describe('gender()', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a default gender', () => {
          const gender = faker.name.gender();

          expect(gender).toBeTypeOf('string');
          expect(faker.definitions.name.gender).toContain(gender);
        });

        it('should return a binary gender', () => {
          const gender = faker.name.gender(true);

          expect(gender).toBeTypeOf('string');
          expect(faker.definitions.name.binary_gender).toContain(gender);
        });
      });

      describe('prefix()', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a prefix', () => {
          const prefix = faker.name.prefix();

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.name.prefix).toContain(prefix);
        });

        it('should return a male prefix', () => {
          faker.locale = 'mk';

          const prefix = faker.name.prefix(0);

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.name.male_prefix).toContain(prefix);
        });

        // TODO @Shinigami92 2022-01-31: There is a bug: https://github.com/faker-js/faker/issues/373
        it.todo('should return a male prefix with given string', () => {
          faker.locale = 'mk';

          const prefix = faker.name.prefix('male');

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.name.male_prefix).toContain(prefix);
        });

        it('should return a female prefix', () => {
          faker.locale = 'mk';

          const prefix = faker.name.prefix(1);

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.name.female_prefix).toContain(prefix);
        });

        // TODO @Shinigami92 2022-01-31: There is a bug: https://github.com/faker-js/faker/issues/373
        it.todo('should return a female prefix with given string', () => {
          faker.locale = 'mk';

          const prefix = faker.name.prefix('female');

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.name.female_prefix).toContain(prefix);
        });
      });

      describe('suffix()', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a suffix', () => {
          const suffix = faker.name.suffix();

          expect(suffix).toBeTypeOf('string');
          expect(faker.definitions.name.suffix).toContain(suffix);
        });
      });

      describe('title()', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a title consisting of a descriptor, area, and type', () => {
          const title = faker.name.title();

          expect(title).toBeTypeOf('string');

          const [descriptor, level, job] = title.split(' ');

          // TODO @Shinigami92 2022-01-31: jobTitle and title are the same
          expect(faker.definitions.name.title.descriptor).toContain(descriptor);
          expect(faker.definitions.name.title.level).toContain(level);
          expect(faker.definitions.name.title.job).toContain(job);
        });
      });

      describe('jobDescriptor()', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a descriptor', () => {
          const descriptor = faker.name.jobDescriptor();

          expect(descriptor).toBeTypeOf('string');

          expect(faker.definitions.name.title.descriptor).toContain(descriptor);
        });
      });

      describe('jobArea()', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a level', () => {
          const level = faker.name.jobArea();

          expect(level).toBeTypeOf('string');

          expect(faker.definitions.name.title.level).toContain(level);
        });
      });

      describe('jobType()', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a job', () => {
          const job = faker.name.jobType();

          expect(job).toBeTypeOf('string');

          expect(faker.definitions.name.title.job).toContain(job);
        });
      });
    }
  });
});
