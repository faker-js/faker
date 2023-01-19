import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { faker, Sex } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('person', () => {
  afterEach(() => {
    faker.locale = 'en';
    faker.localeFallback = 'en';
  });

  seededTests(faker, 'person', (t) => {
    t.itEach(
      'sexType',
      'gender',
      'jobTitle',
      'jobDescriptor',
      'jobArea',
      'jobType',
      'bio'
    );

    t.describeEach(
      'firstName',
      'lastName',
      'middleName',
      'prefix',
      'sex',
      'suffix'
    )((t) => t.it('noArgs').it('with sex', 'male'));

    t.describe('fullName', (t) => {
      t.it('noArgs')
        .it('with firstName', { firstName: 'John' })
        .it('with lastName', { lastName: 'Doe' })
        .it('with sex', { sex: 'female' })
        .it('with all (sex)', {
          firstName: 'John',
          lastName: 'Doe',
          sex: 'female',
        });
    });

    t.it('zodiacSign');
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('firstName()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a random first name', () => {
          const first_name = faker.person.firstName();

          expect(first_name).toBeTypeOf('string');
          expect(first_name.length).toBeGreaterThan(0);
        });

        it('should return a sex-specific first name', () => {
          let name = faker.person.firstName('female');
          expect(faker.definitions.person.female_first_name).toContain(name);

          name = faker.person.firstName('male');
          expect(faker.definitions.person.male_first_name).toContain(name);
        });

        it('should return a sex-specific first name when no sex-specific first name was defined', () => {
          faker.locale = 'az';
          faker.localeFallback = 'az';

          const name = faker.person.firstName();
          expect([
            ...faker.definitions.person.female_first_name,
            ...faker.definitions.person.male_first_name,
          ]).toContain(name);
        });
      });

      describe('lastName()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a random last name', () => {
          const last_name = faker.person.lastName();

          expect(last_name).toBeTypeOf('string');
          expect(last_name.length).toBeGreaterThan(0);
        });

        it('should return a sex-specific last name', () => {
          faker.locale = 'az';

          let name = faker.person.lastName('female');
          expect(faker.definitions.person.female_last_name).toContain(name);

          name = faker.person.lastName('male');
          expect(faker.definitions.person.male_last_name).toContain(name);
        });
      });

      describe('middleName()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a random middle name', () => {
          const middle_name = faker.person.middleName();

          expect(middle_name).toBeTypeOf('string');
          expect(middle_name.length).toBeGreaterThan(0);
        });

        it('should return a middle name when passed en locale', () => {
          faker.locale = 'en';

          let name = faker.person.middleName();
          expect(faker.definitions.person.middle_name).toContain(name);

          name = faker.person.middleName('female');
          expect(faker.definitions.person.female_middle_name).toContain(name);

          name = faker.person.middleName('male');
          expect(faker.definitions.person.male_middle_name).toContain(name);
        });

        it('should return a sex-specific middle name', () => {
          faker.locale = 'uk';

          let name = faker.person.middleName('female');
          expect(faker.definitions.person.female_middle_name).toContain(name);

          name = faker.person.middleName('male');
          expect(faker.definitions.person.male_middle_name).toContain(name);
        });
      });

      describe('fullName()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a name with firstName and lastName', () => {
          const fullName = faker.person.fullName();

          expect(fullName).toBeTypeOf('string');
          expect(fullName).toContain(' ');
        });

        it('should return a female sex-specific name without firstName and lastName', () => {
          faker.locale = 'mk';

          const female_specific = [
            ...faker.definitions.person.female_prefix,
            ...faker.definitions.person.female_first_name,
            ...faker.definitions.person.female_last_name,
            ...faker.definitions.person.suffix,
          ];

          const fullName = faker.person.fullName({ sex: 'female' });

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(female_specific).toContain(part);
          }
        });

        it('should return a male sex-specific name without firstName and lastName', () => {
          faker.locale = 'mk';

          const male_specific = [
            ...faker.definitions.person.male_prefix,
            ...faker.definitions.person.male_first_name,
            ...faker.definitions.person.male_last_name,
            ...faker.definitions.person.suffix,
          ];

          const fullName = faker.person.fullName({ sex: 'male' });

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(male_specific).toContain(part);
          }
        });

        it('should return a female sex-specific name with given firstName and lastName', () => {
          faker.locale = 'mk';

          const male_specific = [
            ...faker.definitions.person.female_prefix,
            'firstName',
            'lastName',
            ...faker.definitions.person.suffix,
          ];

          const fullName = faker.person.fullName({
            firstName: 'firstName',
            lastName: 'lastName',
            sex: 'female',
          });

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(male_specific).toContain(part);
          }
        });

        it('should return a male sex-specific name with given firstName and lastName', () => {
          faker.locale = 'mk';

          const male_specific = [
            ...faker.definitions.person.male_prefix,
            'firstName',
            'lastName',
            ...faker.definitions.person.suffix,
          ];

          const fullName = faker.person.fullName({
            firstName: 'firstName',
            lastName: 'lastName',
            sex: 'male',
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
          const gender = faker.person.gender();

          expect(gender).toBeTypeOf('string');
          expect(faker.definitions.person.gender).toContain(gender);
        });
      });

      describe('sex()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a sex', () => {
          const sex = faker.person.sex();

          expect(sex).toBeTypeOf('string');
          expect(faker.definitions.person.sex).toContain(sex);
        });
      });

      describe('sexType()', () => {
        it('should return a sex type', () => {
          const sexType = faker.person.sexType();

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
          const prefix = faker.person.prefix();

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.person.prefix).toContain(prefix);
        });

        it('should return a female prefix with given string', () => {
          faker.locale = 'mk';

          const prefix = faker.person.prefix('female');

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.person.female_prefix).toContain(prefix);
        });

        it('should return a male prefix with given string', () => {
          faker.locale = 'mk';

          const prefix = faker.person.prefix('male');

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.person.male_prefix).toContain(prefix);
        });
      });

      describe('suffix()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a suffix', () => {
          const suffix = faker.person.suffix();

          expect(suffix).toBeTypeOf('string');
          expect(faker.definitions.person.suffix).toContain(suffix);
        });
      });

      describe('jobTitle()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a job title consisting of a descriptor, area, and type', () => {
          const jobTitle = faker.person.jobTitle();

          expect(jobTitle).toBeTypeOf('string');

          const [descriptor, level, job] = jobTitle.split(' ');

          expect(faker.definitions.person.title.descriptor).toContain(
            descriptor
          );
          expect(faker.definitions.person.title.level).toContain(level);
          expect(faker.definitions.person.title.job).toContain(job);
        });
      });

      describe('jobDescriptor()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a descriptor', () => {
          const descriptor = faker.person.jobDescriptor();

          expect(descriptor).toBeTypeOf('string');

          expect(faker.definitions.person.title.descriptor).toContain(
            descriptor
          );
        });
      });

      describe('jobArea()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a level', () => {
          const level = faker.person.jobArea();

          expect(level).toBeTypeOf('string');

          expect(faker.definitions.person.title.level).toContain(level);
        });
      });

      describe('jobType()', () => {
        beforeEach(() => {
          faker.locale = 'en';
          faker.localeFallback = 'en';
        });

        it('should return a job', () => {
          const job = faker.person.jobType();

          expect(job).toBeTypeOf('string');

          expect(faker.definitions.person.title.job).toContain(job);
        });
      });

      describe('zodiacSign()', () => {
        it('returns a random zodiac sign', () => {
          const sign = faker.person.zodiacSign();

          expect(sign).toBeTypeOf('string');

          expect(faker.definitions.person.western_zodiac_sign).toContain(sign);
        });
      });
    }
  });
});
