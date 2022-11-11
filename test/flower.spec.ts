import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('flower', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'flower', (t) => {
    t.itEach(
      'flowerName',
      'flowerDescription',
      'flowerPotSize',
      'flowerOrigin'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.flower.flowerName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.flower?.name).toContain(name);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.flower.flowerDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.flower?.description).toContain(description);
        });
      });

      describe('potSize()', () => {
        it('returns a random pot size', () => {
          const potSize = faker.flower.flowerPotSize();

          expect(potSize).toBeTruthy();
          expect(potSize).toBeTypeOf('string');
          expect(faker.definitions.flower?.potSize).toContain(potSize);
        });
      });

      describe('origin()', () => {
        it('returns a random origin', () => {
          const origin = faker.flower.flowerOrigin();

          expect(origin).toBeTruthy();
          expect(origin).toBeTypeOf('string');
        });
      });
    }
  });
});
