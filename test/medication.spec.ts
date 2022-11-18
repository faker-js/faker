import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('medication', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'medication', (t) => {
    t.itEach(
      'medicationName',
      'medicationDescription',
      'medicationFormat',
      'medicationCategory',
      'medicationManufacturer',
      'medicationHowToUse'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.medication.medicationName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.medication?.name).toContain(name);
        });
      });

      describe('manufacturer()', () => {
        it('returns a random manufacturer', () => {
          const manufacturer = faker.medication.medicationManufacturer();

          expect(manufacturer).toBeTruthy();
          expect(manufacturer).toBeTypeOf('string');
          expect(faker.definitions.medication?.manufacturer).toContain(
            manufacturer
          );
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.medication.medicationDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.medication?.description).toContain(
            description
          );
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.medication.medicationCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.medication?.category).toContain(category);
        });
      });

      describe('format()', () => {
        it('returns a random format', () => {
          const category = faker.medication.medicationFormat();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.medication?.category).toContain(category);
        });
      });

      describe('howToUse()', () => {
        it('returns a random how to use', () => {
          const howToUse = faker.medication.medicationHowToUse();

          expect(howToUse).toBeTruthy();
          expect(howToUse).toBeTypeOf('string');
          expect(faker.definitions.medication?.howToUse).toContain(howToUse);
        });
      });
    }
  });
});
