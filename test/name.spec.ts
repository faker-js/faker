import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
        noArgs: 'Greer',
      },
      findName: {
        noArgs: 'Darnell Deckow',
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
        noArgs: 'Dakota',
      },
      findName: {
        noArgs: 'Eugene Effertz',
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
        noArgs: 'Sawyer',
      },
      findName: {
        noArgs: 'Henrietta Sanford',
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
    faker.localeFallback = 'en';
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
          faker.localeFallback = 'en';
        });

        it('should return a random first name', () => {
          const first_name = faker.name.firstName();

          expect(first_name).toBeTypeOf('string');
          expect(first_name.length).toBeGreaterThan(0);
        });

        it('should return a gender-specific first name when passed a number', () => {
          const spy = vi.spyOn(console, 'warn');

          let name = faker.name.firstName(0);
          expect(faker.definitions.name.male_first_name).toContain(name);
          expect(spy).toHaveBeenCalledWith(
            "[@faker-js/faker]: name.firstName(number) is deprecated since v6.1.0 and will be removed in v7.0.0. Please use 'female' or 'male' instead."
          );

          name = faker.name.firstName(1);
          expect(faker.definitions.name.female_first_name).toContain(name);
          expect(spy).toHaveBeenCalledWith(
            "[@faker-js/faker]: name.firstName(number) is deprecated since v6.1.0 and will be removed in v7.0.0. Please use 'female' or 'male' instead."
          );

          spy.mockRestore();
        });

        it('should return a gender-specific first name when passed a string', () => {
          let name = faker.name.firstName('female');
          expect(faker.definitions.name.female_first_name).toContain(name);

          name = faker.name.firstName('male');
          expect(faker.definitions.name.male_first_name).toContain(name);
        });

        it('should return a gender-specific first name when no gender-specific first name was defined', () => {
          faker.locale = 'az';
          faker.localeFallback = 'az';

          const name = faker.name.firstName();
          expect([
            ...faker.definitions.name.female_first_name,
            ...faker.definitions.name.male_first_name,
          ]).toContain(name);
        });
      });

      describe('lastName()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a random last name', () => {
          const last_name = faker.name.lastName();

          expect(last_name).toBeTypeOf('string');
          expect(last_name.length).toBeGreaterThan(0);
        });

        it('should return a gender-specific last name when passed a number', () => {
          faker.locale = 'az';

          const spy = vi.spyOn(console, 'warn');

          let name = faker.name.lastName(0);
          expect(faker.definitions.name.male_last_name).toContain(name);
          expect(spy).toHaveBeenCalledWith(
            "[@faker-js/faker]: name.lastName(number) is deprecated since v6.1.0 and will be removed in v7.0.0. Please use 'female' or 'male' instead."
          );

          name = faker.name.lastName(1);
          expect(faker.definitions.name.female_last_name).toContain(name);
          expect(spy).toHaveBeenCalledWith(
            "[@faker-js/faker]: name.lastName(number) is deprecated since v6.1.0 and will be removed in v7.0.0. Please use 'female' or 'male' instead."
          );

          spy.mockRestore();
        });

        it('should return a gender-specific last name when passed a string', () => {
          faker.locale = 'az';

          let name = faker.name.lastName('female');
          expect(faker.definitions.name.female_last_name).toContain(name);

          name = faker.name.lastName('male');
          expect(faker.definitions.name.male_last_name).toContain(name);
        });
      });

      describe('middleName()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a random middle name', () => {
          const middle_name = faker.name.middleName();

          expect(middle_name).toBeTypeOf('string');
          expect(middle_name.length).toBeGreaterThan(0);
        });

        it('should return a middle name when passed en locale', () => {
          faker.locale = 'en';

          let name = faker.name.middleName();
          expect(faker.definitions.name.middle_name).toContain(name);

          name = faker.name.middleName('female');
          expect(faker.definitions.name.female_middle_name).toContain(name);

          name = faker.name.middleName('male');
          expect(faker.definitions.name.male_middle_name).toContain(name);
        });

        it('should return a gender-specific middle name when passed a number', () => {
          const spy = vi.spyOn(console, 'warn');

          faker.locale = 'uk';

          let name = faker.name.middleName(0);
          expect(faker.definitions.name.male_middle_name).toContain(name);
          expect(spy).toHaveBeenCalledWith(
            "[@faker-js/faker]: name.middleName(number) is deprecated since v6.1.0 and will be removed in v7.0.0. Please use 'female' or 'male' instead."
          );

          name = faker.name.middleName(1);
          expect(faker.definitions.name.female_middle_name).toContain(name);
          expect(spy).toHaveBeenCalledWith(
            "[@faker-js/faker]: name.middleName(number) is deprecated since v6.1.0 and will be removed in v7.0.0. Please use 'female' or 'male' instead."
          );

          spy.mockRestore();
        });

        it('should return a gender-specific middle name when passed a string', () => {
          faker.locale = 'uk';

          let name = faker.name.middleName('female');
          expect(faker.definitions.name.female_middle_name).toContain(name);

          name = faker.name.middleName('male');
          expect(faker.definitions.name.male_middle_name).toContain(name);
        });
      });

      describe('findName()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a name with firstName and lastName', () => {
          const fullName = faker.name.findName();

          expect(fullName).toBeTypeOf('string');
          expect(fullName).toContain(' ');
        });

        it('should return a female gender-specific name with firstName and lastName', () => {
          faker.locale = 'mk';

          const female_specific = [
            ...faker.definitions.name.female_prefix,
            ...faker.definitions.name.female_first_name,
            ...faker.definitions.name.female_last_name,
            ...faker.definitions.name.suffix,
          ];

          const fullName = faker.name.findName(undefined, undefined, 'female');

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(female_specific).toContain(part);
          }
        });

        it('should return a male gender-specific name with firstName and lastName', () => {
          faker.locale = 'mk';

          const male_specific = [
            ...faker.definitions.name.male_prefix,
            ...faker.definitions.name.male_first_name,
            ...faker.definitions.name.male_last_name,
            ...faker.definitions.name.suffix,
          ];

          const fullName = faker.name.findName(undefined, undefined, 'male');

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

          const fullName = faker.name.findName(
            'firstName',
            'lastName',
            'female'
          );

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(male_specific).toContain(part);
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

          const fullName = faker.name.findName('firstName', 'lastName', 'male');

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(male_specific).toContain(part);
          }
        });
      });

      describe('gender()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
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
          faker.localeFallback = 'en';
        });

        it('should return a prefix', () => {
          const prefix = faker.name.prefix();

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.name.prefix).toContain(prefix);
        });

        it('should return a female prefix with given string', () => {
          faker.locale = 'mk';

          const prefix = faker.name.prefix('female');

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.name.female_prefix).toContain(prefix);
        });

        it('should return a male prefix with given string', () => {
          faker.locale = 'mk';

          const prefix = faker.name.prefix('male');

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.name.male_prefix).toContain(prefix);
        });

        it('should return a male prefix with given number', () => {
          const spy = vi.spyOn(console, 'warn');

          faker.locale = 'mk';

          const prefix = faker.name.prefix(0);

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.name.male_prefix).toContain(prefix);

          expect(spy).toHaveBeenCalledWith(
            "[@faker-js/faker]: name.prefix(number) is deprecated since v6.1.0 and will be removed in v7.0.0. Please use 'female' or 'male' instead."
          );

          spy.mockRestore();
        });

        it('should return a female prefix with given number', () => {
          const spy = vi.spyOn(console, 'warn');

          faker.locale = 'mk';

          const prefix = faker.name.prefix(1);

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.name.female_prefix).toContain(prefix);

          expect(spy).toHaveBeenCalledWith(
            "[@faker-js/faker]: name.prefix(number) is deprecated since v6.1.0 and will be removed in v7.0.0. Please use 'female' or 'male' instead."
          );

          spy.mockRestore();
        });
      });

      describe('suffix()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
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
          faker.localeFallback = 'en';
        });

        it('should display deprecated message', () => {
          const spy = vi.spyOn(console, 'warn');

          faker.name.title();

          expect(spy).toHaveBeenCalledWith(
            '[@faker-js/faker]: faker.name.title() is deprecated since v6.1.2 and will be removed in v7.0.0. Please use faker.name.jobTitle() instead.'
          );

          spy.mockRestore();
        });

        it('should call jobTitle()', () => {
          const spy = vi.spyOn(faker.name, 'jobTitle');

          faker.name.title();

          expect(spy).toHaveBeenCalledWith();

          spy.mockRestore();
        });

        it('should return a title consisting of a descriptor, area, and type', () => {
          const title = faker.name.title();

          expect(title).toBeTypeOf('string');

          const [descriptor, level, job] = title.split(' ');

          expect(faker.definitions.name.title.descriptor).toContain(descriptor);
          expect(faker.definitions.name.title.level).toContain(level);
          expect(faker.definitions.name.title.job).toContain(job);
        });
      });

      describe('jobTitle()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
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

      describe('jobDescriptor()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
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
          faker.localeFallback = 'en';
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
          faker.localeFallback = 'en';
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
