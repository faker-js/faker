import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('cigar', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'cigar', (t) => {
    t.itEach(
      'cigarBrand',
      'cigarLine',
      'cigarShape',
      'cigarStrength',
      'cigarDescription',
      'cigarOrigin'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.cigar.cigarBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.cigar?.brand).toContain(brand);
        });
      });

      describe('line()', () => {
        it('returns a random line', () => {
          const line = faker.cigar.cigarLine();

          expect(line).toBeTruthy();
          expect(line).toBeTypeOf('string');
          expect(faker.definitions.cigar?.line).toContain(line);
        });
      });

      describe('strength()', () => {
        it('returns a random strength', () => {
          const strength = faker.cigar.cigarStrength();

          expect(strength).toBeTruthy();
          expect(strength).toBeTypeOf('string');
          expect(faker.definitions.cigar?.strength).toContain(strength);
        });
      });

      describe('shape()', () => {
        it('returns a random shape', () => {
          const shape = faker.cigar.cigarShape();

          expect(shape).toBeTruthy();
          expect(shape).toBeTypeOf('string');
          expect(faker.definitions.cigar?.shape).toContain(shape);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.cigar.cigarDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.cigar?.description).toContain(description);
        });
      });

      describe('origin()', () => {
        it('returns a random origin', () => {
          const origin = faker.cigar.cigarOrigin();

          expect(origin).toBeTruthy();
          expect(origin).toBeTypeOf('string');
        });
      });
    }
  });
});
