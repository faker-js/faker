import { describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('sports', () => {
  seededTests(faker, 'sports', (t) => {
    t.describe('team', (t) => {
      t.it('noArgs');
    });
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe(`team()`, () => {
        it('should return a team name with at least two words', () => {
          const team = faker.sports.team();
          expect(team).toBeTypeOf('string');
          expect(team.split(' ').length).toBeGreaterThanOrEqual(2);
        });
      });
    }
  });
});
