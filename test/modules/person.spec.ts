import { describe, expect, it } from 'vitest';
import { Sex, faker, fakerAZ, fakerMK, fakerUK } from '../../src';
import { seededTests } from '../support/seeded-runs';
import { times } from './../support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('person', () => {
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

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('firstName()', () => {
        it('should return a random first name', () => {
          const first_name = faker.person.firstName();

          expect(first_name).toBeTypeOf('string');
          expect(first_name.length).toBeGreaterThan(0);
        });

        it('should return a sex-specific first name', () => {
          let name = faker.person.firstName('female');
          expect(faker.definitions.person.first_name.female).toContain(name);

          name = faker.person.firstName('male');
          expect(faker.definitions.person.first_name.male).toContain(name);
        });

        it('should return a sex-specific first name when no sex-specific first name was defined', () => {
          const name = fakerAZ.person.firstName();
          expect([
            ...(fakerAZ.definitions.person.first_name.female ?? []),
            ...(fakerAZ.definitions.person.first_name.male ?? []),
          ]).toContain(name);
        });
      });

      describe('lastName()', () => {
        it('should return a random last name', () => {
          const last_name = faker.person.lastName();

          expect(last_name).toBeTypeOf('string');
          expect(last_name.length).toBeGreaterThan(0);
        });

        it('should return a sex-specific last name', () => {
          let name = fakerAZ.person.lastName('female');
          expect(fakerAZ.definitions.person.last_name.female).toContain(name);

          name = fakerAZ.person.lastName('male');
          expect(fakerAZ.definitions.person.last_name.male).toContain(name);
        });
      });

      describe('middleName()', () => {
        it('should return a random middle name', () => {
          const middle_name = faker.person.middleName();

          expect(middle_name).toBeTypeOf('string');
          expect(middle_name.length).toBeGreaterThan(0);
        });

        it('should return a middle name when passed en locale', () => {
          let name = faker.person.middleName();
          expect(faker.definitions.person.middle_name.generic).toContain(name);

          name = faker.person.middleName('female');
          expect(faker.definitions.person.middle_name.female).toContain(name);

          name = faker.person.middleName('male');
          expect(faker.definitions.person.middle_name.male).toContain(name);
        });

        it('should return a sex-specific middle name', () => {
          let name = fakerUK.person.middleName('female');
          expect(fakerUK.definitions.person.middle_name.female).toContain(name);

          name = fakerUK.person.middleName('male');
          expect(fakerUK.definitions.person.middle_name.male).toContain(name);
        });
      });

      describe('fullName()', () => {
        it('should return a name with firstName and lastName', () => {
          const fullName = faker.person.fullName();

          expect(fullName).toBeTypeOf('string');
          expect(fullName).toContain(' ');
        });

        it('should return a female sex-specific name without firstName and lastName', () => {
          const female_specific = [
            ...(fakerMK.rawDefinitions.person?.prefix?.female ?? []),
            ...(fakerMK.rawDefinitions.person?.first_name?.female ?? []),
            ...(fakerMK.rawDefinitions.person?.last_name?.female ?? []),
            // ...(fakerMK.rawDefinitions.person?.suffix ?? []), Not applicable
          ];

          const fullName = fakerMK.person.fullName({ sex: 'female' });

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(female_specific).toContain(part);
          }
        });

        it('should return a male sex-specific name without firstName and lastName', () => {
          const male_specific = [
            ...(fakerMK.rawDefinitions.person?.prefix?.male ?? []),
            ...(fakerMK.rawDefinitions.person?.first_name?.male ?? []),
            ...(fakerMK.rawDefinitions.person?.last_name?.male ?? []),
            // ...(fakerMK.rawDefinitions.person?.suffix ?? []), Not applicable
          ];

          const fullName = fakerMK.person.fullName({ sex: 'male' });

          const parts = fullName.split(' ');
          for (const part of parts) {
            expect(male_specific).toContain(part);
          }
        });

        it('should return a female sex-specific name with given firstName and lastName', () => {
          const male_specific = [
            ...(fakerMK.rawDefinitions.person?.prefix?.female ?? []),
            'firstName',
            'lastName',
            // ...(fakerMK.rawDefinitions.person?.suffix ?? []), Not applicable
          ];

          const fullName = fakerMK.person.fullName({
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
          const male_specific = [
            ...(fakerMK.rawDefinitions.person?.prefix?.male ?? []),
            'firstName',
            'lastName',
            // ...(fakerMK.rawDefinitions.person?.suffix ?? []), Not applicable
          ];

          const fullName = fakerMK.person.fullName({
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
        it('should return a default gender', () => {
          const gender = faker.person.gender();

          expect(gender).toBeTypeOf('string');
          expect(faker.definitions.person.gender).toContain(gender);
        });
      });

      describe('sex()', () => {
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
        it('should return a prefix', () => {
          const prefix = faker.person.prefix();

          expect(prefix).toBeTypeOf('string');
          expect(faker.definitions.person.prefix.generic).toContain(prefix);
        });

        it('should return a female prefix with given string', () => {
          const prefix = fakerMK.person.prefix('female');

          expect(prefix).toBeTypeOf('string');
          expect(fakerMK.definitions.person.prefix.female).toContain(prefix);
        });

        it('should return a male prefix with given string', () => {
          const prefix = fakerMK.person.prefix('male');

          expect(prefix).toBeTypeOf('string');
          expect(fakerMK.definitions.person.prefix.male).toContain(prefix);
        });
      });

      describe('suffix()', () => {
        it('should return a suffix', () => {
          const suffix = faker.person.suffix();

          expect(suffix).toBeTypeOf('string');
          expect(faker.definitions.person.suffix).toContain(suffix);
        });
      });

      describe('jobTitle()', () => {
        it('should return a job title consisting of a descriptor, area, and type', () => {
          const jobTitle = faker.person.jobTitle();

          expect(jobTitle).toBeTypeOf('string');

          const [descriptor, level, job] = jobTitle.split(' ');

          expect(faker.definitions.person.job_descriptor).toContain(descriptor);
          expect(faker.definitions.person.job_area).toContain(level);
          expect(faker.definitions.person.job_type).toContain(job);
        });
      });

      describe('jobDescriptor()', () => {
        it('should return a descriptor', () => {
          const descriptor = faker.person.jobDescriptor();

          expect(descriptor).toBeTypeOf('string');

          expect(faker.definitions.person.job_descriptor).toContain(descriptor);
        });
      });

      describe('jobArea()', () => {
        it('should return a level', () => {
          const level = faker.person.jobArea();

          expect(level).toBeTypeOf('string');

          expect(faker.definitions.person.job_area).toContain(level);
        });
      });

      describe('jobType()', () => {
        it('should return a job', () => {
          const job = faker.person.jobType();

          expect(job).toBeTypeOf('string');

          expect(faker.definitions.person.job_type).toContain(job);
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
  );
});
