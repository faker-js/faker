import { describe, expect, it } from 'vitest';
import { faker } from '../../src';
import { seededTests } from '../support/seeded-runs';
import { times } from '../support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('medical', () => {
  seededTests(faker, 'medical', (t) => {
    t.itEach(
      'specialty',
      'department',
      'condition',
      'symptom',
      'procedure',
      'allergen',
      'bloodType',
      'drugName'
    );
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('specialty()', () => {
        it('should return a random value from the specialty array', () => {
          const actual = faker.medical.specialty();
          expect(faker.definitions.medical.specialty).toContain(actual);
        });
      });

      describe('department()', () => {
        it('should return a random value from the department array', () => {
          const actual = faker.medical.department();
          expect(faker.definitions.medical.department).toContain(actual);
        });
      });

      describe('condition()', () => {
        it('should return a random value from the condition array', () => {
          const actual = faker.medical.condition();
          expect(faker.definitions.medical.condition).toContain(actual);
        });
      });

      describe('symptom()', () => {
        it('should return a random value from the symptom array', () => {
          const actual = faker.medical.symptom();
          expect(faker.definitions.medical.symptom).toContain(actual);
        });
      });

      describe('procedure()', () => {
        it('should return a random value from the procedure array', () => {
          const actual = faker.medical.procedure();
          expect(faker.definitions.medical.procedure).toContain(actual);
        });
      });

      describe('allergen()', () => {
        it('should return a random value from the allergen array', () => {
          const actual = faker.medical.allergen();
          expect(faker.definitions.medical.allergen).toContain(actual);
        });
      });

      describe('bloodType()', () => {
        it('should return a random value from the blood type array', () => {
          const actual = faker.medical.bloodType();
          expect(faker.definitions.medical.blood_type).toContain(actual);
        });
      });

      describe('drugName()', () => {
        it('should return a non-empty fictitious drug name', () => {
          const actual = faker.medical.drugName();
          expect(actual).toBeTypeOf('string');
          expect(actual.length).toBeGreaterThan(0);
          expect(actual).toMatch(/^[A-Za-z]+$/);
        });

        it('should not end with a real INN stem', () => {
          const lower = faker.medical.drugName().toLowerCase();
          for (const ending of faker.definitions.medical
            .drug_forbidden_ending) {
            expect(lower.endsWith(ending)).toBe(false);
          }
        });
      });
    }
  );
});
