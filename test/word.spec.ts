import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('word', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'word', (t) => {
    t.describeEach(
      'adjective',
      'adverb',
      'conjunction',
      'interjection',
      'noun',
      'preposition',
      'verb'
    )((t) => {
      t.it('noArgs').it('with length = 10', 10).it('with length = 20', 20);
    });
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe(`adjective`, () => {
        it('should return adjective from adjective array', () => {
          const actual = faker.word.adjective();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.adjective).toContain(actual);
        });
      });

      describe(`adverb`, () => {
        it('should return adverb from adverb array', () => {
          const actual = faker.word.adverb();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.adverb).toContain(actual);
        });
      });

      describe(`conjunction`, () => {
        it('should return conjunction from conjunction array', () => {
          const actual = faker.word.conjunction();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.conjunction).toContain(actual);
        });
      });

      describe(`interjection`, () => {
        it('should return interjection from interjection array', () => {
          const actual = faker.word.interjection();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.interjection).toContain(actual);
        });
      });

      describe(`noun`, () => {
        it('should return noun from noun array', () => {
          const actual = faker.word.noun();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.noun).toContain(actual);
        });
      });

      describe(`preposition`, () => {
        it('should return preposition from preposition array', () => {
          const actual = faker.word.preposition();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.preposition).toContain(actual);
        });
      });

      describe(`verb`, () => {
        it('should return verb from verb array', () => {
          const actual = faker.word.verb();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.verb).toContain(actual);
        });
      });
    }
  });
});
