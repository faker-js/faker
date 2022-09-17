import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { faker, Sex } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('name', () => {
  afterEach(() => {
    faker.locale = 'en';
    faker.localeFallback = 'en';
  });

  seededTests(faker, 'name', (t) => {
    t.itEach('sexType', 'jobTitle', 'jobDescriptor', 'jobArea', 'jobType');

    t.describeEach(
      'firstName',
      'lastName',
      'middleName',
      'gender',
      'prefix',
      'sex',
      'suffix'
    )((t) => t.it('noArgs').it('with gender', 'male'));

    t.describe('findName', (t) => {
      t.it('noArgs')
        .it('with name', 'John', 'Doe')
        .it('with gender', undefined, undefined, 'female')
        .it('with name and gender', 'John', 'Doe', 'female');
    });

    t.describe('fullName', (t) => {
      t.it('noArgs')
        .it('with firstName', { firstName: 'John' })
        .it('with lastName', { lastName: 'Doe' })
        .it('with gender', { gender: 'female' }) // deprecated
        .it('with sex', { sex: 'female' })
        .it('with all (gender)', {
          firstName: 'John',
          lastName: 'Doe',
          // deprecated
          gender: 'female',
        })
        .it('with all (sex)', {
          firstName: 'John',
          lastName: 'Doe',
          sex: 'female',
        });
    });
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
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

        it('should return a sex-specific first name', () => {
          let name = faker.name.firstName('female');
          expect(faker.definitions.name.female_first_name).toContain(name);

          name = faker.name.firstName('male');
          expect(faker.definitions.name.male_first_name).toContain(name);
        });

        it('should return a sex-specific first name when no sex-specific first name was defined', () => {
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

        it('should return a sex-specific last name', () => {
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

        it('should return a sex-specific middle name', () => {
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

        it('should return a female sex-specific name with firstName and lastName', () => {
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

        it('should return a male sex-specific name with firstName and lastName', () => {
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

        it('should return a female sex-specific name with given firstName and lastName', () => {
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

        it('should return a male sex-specific name with given firstName and lastName', () => {
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

      describe('fullName()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a name with firstName and lastName', () => {
          const fullName = faker.name.fullName();
          expect(fullName).toBeTypeOf('string');
          expect(fullName).toContain(' ');
        });

        it('should return a female gender-specific name without firstName and lastName', () => {
          faker.locale = 'mk';

          const female_specific = [
            ...faker.definitions.name.female_prefix,
            ...faker.definitions.name.female_first_name,
            ...faker.definitions.name.female_last_name,
            ...faker.definitions.name.suffix,
          ];

          const fullName = faker.name.fullName({ gender: 'female' });

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(female_specific).toContain(part);
          }
        });

        it('should return a male gender-specific name without firstName and lastName', () => {
          faker.locale = 'mk';

          const male_specific = [
            ...faker.definitions.name.male_prefix,
            ...faker.definitions.name.male_first_name,
            ...faker.definitions.name.male_last_name,
            ...faker.definitions.name.suffix,
          ];

          const fullName = faker.name.fullName({ gender: 'male' });

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

          const fullName = faker.name.fullName({
            firstName: 'firstName',
            lastName: 'lastName',
            gender: 'female',
          });

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

          const fullName = faker.name.fullName({
            firstName: 'firstName',
            lastName: 'lastName',
            gender: 'male',
          });

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(male_specific).toContain(part);
          }
        });

        it('If fullNamePattern is defined, it should be configured accordingly.', () => {
          faker.locale = 'ja';
          const male_specific = [
            ...faker.definitions.name.prefix,
            'firstName',
            'lastName',
            ...faker.definitions.name.suffix,
          ];
          const fullName = faker.name.fullName({
            firstName: 'firstName',
            lastName: 'lastName',
            gender: 'male',
          });

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
          expect(faker.definitions.name.sex).toContain(gender);
        });
      });

      describe('sex()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a sex', () => {
          const sex = faker.name.sex();

          expect(sex).toBeTypeOf('string');
          expect(faker.definitions.name.sex).toContain(sex);
        });
      });

      describe('sexType()', () => {
        it('should return a sex type', () => {
          const sexType = faker.name.sexType();

          expect(sexType).toBeTypeOf('string');
          expect(Object.values(Sex)).toContain(sexType);
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
