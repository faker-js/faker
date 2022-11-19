import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('tattoo', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'tattoo', (t) => {
    t.itEach('tattooName', 'tattooSubject', 'tattooStyle', 'tattooPlacement');
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.tattoo.tattooName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.tattoo?.name).toContain(name);
        });
      });

      describe('subject()', () => {
        it('returns a random subject', () => {
          const subject = faker.tattoo.tattooSubject();

          expect(subject).toBeTruthy();
          expect(subject).toBeTypeOf('string');
          expect(faker.definitions.tattoo?.subject).toContain(subject);
        });
      });

      describe('style()', () => {
        it('returns a random style', () => {
          const style = faker.tattoo.tattooStyle();

          expect(style).toBeTruthy();
          expect(style).toBeTypeOf('string');
          expect(faker.definitions.tattoo?.style).toContain(style);
        });
      });

      describe('placement()', () => {
        it('returns a random placement', () => {
          const placement = faker.tattoo.tattooPlacement();

          expect(placement).toBeTruthy();
          expect(placement).toBeTypeOf('string');
          expect(faker.definitions.tattoo?.placement).toContain(placement);
        });
      });
    }
  });
});
