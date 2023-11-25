import { describe, expect, it } from 'vitest';
import { faker } from '../../src';
import { seededTests } from '../support/seeded-runs';
import { times } from './../support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('hacker', () => {
  seededTests(faker, 'hacker', (t) => {
    t.itEach('abbreviation', 'adjective', 'noun', 'verb', 'ingverb', 'phrase');
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('abbreviation()', () => {
        it('should return a random abbreviation from array', () => {
          const abbreviation = faker.hacker.abbreviation();

          expect(abbreviation).toBeTypeOf('string');
          expect(abbreviation.length).toBeGreaterThan(0);
          expect(faker.definitions.hacker.abbreviation).toContain(abbreviation);
        });
      });

      describe('adjective', () => {
        it('should return a random adjective from array', () => {
          const adjective = faker.hacker.adjective();

          expect(adjective).toBeTypeOf('string');
          expect(adjective.length).toBeGreaterThan(0);
          expect(faker.definitions.hacker.adjective).toContain(adjective);
        });
      });

      describe('noun', () => {
        it('should return a random noun from array', () => {
          const noun = faker.hacker.noun();

          expect(noun).toBeTypeOf('string');
          expect(noun.length).toBeGreaterThan(0);
          expect(faker.definitions.hacker.noun).toContain(noun);
        });
      });

      describe('verb', () => {
        it('should return a random verb from array', () => {
          const verb = faker.hacker.verb();

          expect(verb).toBeTypeOf('string');
          expect(verb.length).toBeGreaterThan(0);
          expect(faker.definitions.hacker.verb).toContain(verb);
        });
      });

      describe('ingverb', () => {
        it('should return a random ingverb from array', () => {
          const ingverb = faker.hacker.ingverb();

          expect(ingverb).toBeTypeOf('string');
          expect(ingverb.length).toBeGreaterThan(0);
          expect(faker.definitions.hacker.ingverb).toContain(ingverb);
        });
      });

      describe('phrase', () => {
        it('should return a random phrase from array', () => {
          const phrase = faker.hacker.phrase();

          expect(phrase).toBeTypeOf('string');
          expect(phrase.length).toBeGreaterThan(0);
        });
      });
    }
  );
});
