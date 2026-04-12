import { describe, expect, it } from 'vitest';
import { Sex, faker, fakerAZ, fakerUK } from '../../src';
import { seededTests } from '../support/seeded-runs';
import { times } from './../support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('person', () => {
  seededTests(faker, 'person', (t) => {
    t.itEach(
      'gender',
      'jobTitle',
      'jobDescriptor',
      'jobArea',
      'jobType',
      'bio'
    );

    t.describe('sexType', (t) =>
      t
        .it('noArgs')
        .it('with includeGeneric=true', { includeGeneric: true })
        .it('with includeGeneric=false', { includeGeneric: false })
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
          const name = faker.person.firstName();

          expect(name).toBeTypeOf('string');
          expect(name.length).toBeGreaterThan(0);
        });

        it('should return a sex-specific first name', () => {
          const {
            generic = [],
            female = [],
            male = [],
          } = faker.definitions.person.first_name;

          const name = faker.person.firstName();
          expect([...generic, ...female, ...male]).toContain(name);

          const genericName = faker.person.firstName('generic');
          expect(generic).toContain(genericName);

          const femaleName = faker.person.firstName('female');
          expect([...generic, ...female]).toContain(femaleName);

          const maleName = faker.person.firstName('male');
          expect([...generic, ...male]).toContain(maleName);
        });

        it('should return a sex-specific first name when no sex-generic first name was defined', () => {
          const {
            generic,
            female = [],
            male = [],
          } = fakerAZ.definitions.person.first_name;

          expect(generic).toBeUndefined();

          const name = fakerAZ.person.firstName();
          expect([...female, ...male]).toContain(name);

          const femaleName = fakerAZ.person.firstName('female');
          expect(female).toContain(femaleName);

          const maleName = fakerAZ.person.firstName('male');
          expect(male).toContain(maleName);
        });
      });

      describe('lastName()', () => {
        it('should return a random last name', () => {
          const name = faker.person.lastName();

          expect(name).toBeTypeOf('string');
          expect(name.length).toBeGreaterThan(0);
        });

        it('should return a sex-specific last name', () => {
          const {
            generic = [],
            female = [],
            male = [],
          } = faker.definitions.person.last_name;

          const name = faker.person.lastName();
          for (const part of name.split(/[ -]/)) {
            expect([...generic, ...female, ...male]).toContain(part);
          }

          const genericName = faker.person.lastName('generic');
          for (const part of genericName.split(/[ -]/)) {
            expect(generic).toContain(part);
          }

          const femaleName = faker.person.lastName('female');
          for (const part of femaleName.split(/[ -]/)) {
            expect([...generic, ...female]).toContain(part);
          }

          const maleName = faker.person.lastName('male');
          for (const part of maleName.split(/[ -]/)) {
            expect([...generic, ...male]).toContain(part);
          }
        });

        it('should return a sex-specific last name when no sex-generic last name was defined', () => {
          const {
            generic,
            female = [],
            male = [],
          } = fakerAZ.definitions.person.last_name;

          expect(generic).toBeUndefined();

          const name = fakerAZ.person.lastName();
          for (const part of name.split(/[ -]/)) {
            expect([...female, ...male]).toContain(part);
          }

          const femaleName = fakerAZ.person.lastName('female');
          for (const part of femaleName.split(/[ -]/)) {
            expect(female).toContain(part);
          }

          const maleName = fakerAZ.person.lastName('male');
          for (const part of maleName.split(/[ -]/)) {
            expect(male).toContain(part);
          }
        });
      });

      describe('middleName()', () => {
        it('should return a random middle name', () => {
          const name = faker.person.middleName();

          expect(name).toBeTypeOf('string');
          expect(name.length).toBeGreaterThan(0);
        });

        it('should return a sex-specific middle name', () => {
          const {
            generic = [],
            female = [],
            male = [],
          } = faker.definitions.person.middle_name;

          const name = faker.person.middleName();
          expect([...generic, ...female, ...male]).toContain(name);

          const genericName = faker.person.middleName('generic');
          expect(generic).toContain(genericName);

          const femaleName = faker.person.middleName('female');
          expect([...generic, ...female]).toContain(femaleName);

          const maleName = faker.person.middleName('male');
          expect([...generic, ...male]).toContain(maleName);
        });

        it('should return a sex-specific middle name when no sex-generic middle name was defined', () => {
          const {
            generic,
            female = [],
            male = [],
          } = fakerUK.definitions.person.middle_name;

          expect(generic).toBeUndefined();

          const femaleName = fakerUK.person.middleName('female');
          expect(female).toContain(femaleName);

          const maleName = fakerUK.person.middleName('male');
          expect(male).toContain(maleName);
        });
      });

      describe('fullName()', () => {
        it('should return a name with firstName and lastName', () => {
          const name = faker.person.fullName();

          expect(name).toBeTypeOf('string');
          expect(name).toContain(' ');
        });

        it('should return a sex-specific full name', () => {
          const { prefix, first_name, last_name, suffix } =
            faker.definitions.person;

          const generic = [
            ...(prefix?.generic ?? []),
            ...(first_name?.generic ?? []),
            ...(last_name?.generic ?? []),
            ...(suffix ?? []),
          ];
          const female = [
            ...(prefix?.female ?? []),
            ...(first_name?.female ?? []),
            ...(last_name?.female ?? []),
          ];
          const male = [
            ...(prefix?.male ?? []),
            ...(first_name?.male ?? []),
            ...(last_name?.male ?? []),
          ];

          const name = faker.person.fullName();
          for (const part of name.split(/[ -]/)) {
            expect([...generic, ...female, ...male]).toContain(part);
          }

          const genericName = faker.person.fullName({ sex: 'generic' });
          for (const part of genericName.split(/[ -]/)) {
            expect(generic).toContain(part);
          }

          const femaleName = faker.person.fullName({ sex: 'female' });
          for (const part of femaleName.split(/[ -]/)) {
            expect([...generic, ...female]).toContain(part);
          }

          const maleName = faker.person.fullName({ sex: 'male' });
          for (const part of maleName.split(/[ -]/)) {
            expect([...generic, ...male]).toContain(part);
          }
        });

        it('should return a sex-specific full name with given firstName and lastName', () => {
          const { prefix, suffix } = faker.definitions.person;

          const generic = [
            ...(prefix?.generic ?? []),
            'firstName',
            'lastName',
            ...(suffix ?? []),
          ];
          const { female = [], male = [] } = prefix ?? {};

          const name = faker.person.fullName({
            firstName: 'firstName',
            lastName: 'lastName',
          });
          for (const part of name.split(/[ -]/)) {
            expect([...generic, ...female, ...male]).toContain(part);
          }

          const genericName = faker.person.fullName({
            sex: 'generic',
            firstName: 'firstName',
            lastName: 'lastName',
          });
          for (const part of genericName.split(/[ -]/)) {
            expect(generic).toContain(part);
          }

          const femaleName = faker.person.fullName({
            sex: 'female',
            firstName: 'firstName',
            lastName: 'lastName',
          });
          for (const part of femaleName.split(/[ -]/)) {
            expect([...generic, ...female]).toContain(part);
          }

          const maleName = faker.person.fullName({
            sex: 'male',
            firstName: 'firstName',
            lastName: 'lastName',
          });
          for (const part of maleName.split(/[ -]/)) {
            expect([...generic, ...male]).toContain(part);
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
        it('should return a sex type without generic by default', () => {
          const sexType = faker.person.sexType();

          expect(sexType).toBeTypeOf('string');
          expect([Sex.Female, Sex.Male]).toContain(sexType);
        });

        it('should return a sex type explicitly without generic', () => {
          const sexType = faker.person.sexType({ includeGeneric: false });

          expect(sexType).toBeTypeOf('string');
          expect([Sex.Female, Sex.Male]).toContain(sexType);
        });

        it('should return a sex type including generic', () => {
          const sexType = faker.person.sexType({ includeGeneric: true });

          expect(sexType).toBeTypeOf('string');
          expect(Object.values(Sex)).toContain(sexType);
        });
      });

      describe('prefix()', () => {
        it('should return a prefix', () => {
          const prefix = faker.person.prefix();

          expect(prefix).toBeTypeOf('string');
          expect(prefix.length).toBeGreaterThan(0);
        });

        it('should return a sex-specific prefix', () => {
          const {
            generic = [],
            female = [],
            male = [],
          } = faker.definitions.person.prefix;

          const name = faker.person.prefix();
          expect([...generic, ...female, ...male]).toContain(name);

          const genericName = faker.person.prefix('generic');
          expect(generic).toContain(genericName);

          const femaleName = faker.person.prefix('female');
          expect([...generic, ...female]).toContain(femaleName);

          const maleName = faker.person.prefix('male');
          expect([...generic, ...male]).toContain(maleName);
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
          const { job_descriptor, job_area, job_type } =
            faker.definitions.person;

          const jobTitle = faker.person.jobTitle();

          expect(jobTitle).toBeTypeOf('string');
          expect(jobTitle.length).toBeGreaterThan(0);

          const [descriptor, level, job] = jobTitle.split(' ');

          expect(job_descriptor).toContain(descriptor);
          expect(job_area).toContain(level);
          expect(job_type).toContain(job);
        });
      });

      describe('jobDescriptor()', () => {
        it('should return a descriptor', () => {
          const descriptor = faker.person.jobDescriptor();

          expect(descriptor).toBeTypeOf('string');
          expect(descriptor.length).toBeGreaterThan(0);

          expect(faker.definitions.person.job_descriptor).toContain(descriptor);
        });
      });

      describe('jobArea()', () => {
        it('should return a level', () => {
          const level = faker.person.jobArea();

          expect(level).toBeTypeOf('string');
          expect(level.length).toBeGreaterThan(0);

          expect(faker.definitions.person.job_area).toContain(level);
        });
      });

      describe('jobType()', () => {
        it('should return a job', () => {
          const job = faker.person.jobType();

          expect(job).toBeTypeOf('string');
          expect(job.length).toBeGreaterThan(0);

          expect(faker.definitions.person.job_type).toContain(job);
        });
      });

      describe('zodiacSign()', () => {
        it('returns a random zodiac sign', () => {
          const sign = faker.person.zodiacSign();

          expect(sign).toBeTypeOf('string');
          expect(sign.length).toBeGreaterThan(0);

          expect(faker.definitions.person.western_zodiac_sign).toContain(sign);
        });
      });
    }
  );
});
