import { describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('company', () => {
  seededTests(faker, 'company', (t) => {
    t.itEach(
      'suffixes',
      'name',
      'companySuffix',
      'catchPhrase',
      'buzzPhrase',
      'catchPhraseAdjective',
      'catchPhraseDescriptor',
      'catchPhraseNoun',
      'buzzAdjective',
      'buzzVerb',
      'buzzNoun'
    );

    t.skip('bs').skip('bsAdjective').skip('bsBuzz').skip('bsNoun');
  });

  describe(
    `random seeded tests for seed ${faker.seed()}`,
    () => {
      describe('suffixes()', () => {
        it('should return all suffixes', () => {
          const actual = faker.company.suffixes();

          expect(actual).toBeTruthy();
          expect(faker.definitions.company.suffix).toEqual(actual);
        });
      });

      describe('name()', () => {
        it('should return a random company name', () => {
          const actual = faker.company.name();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
        });
      });

      describe('companySuffix()', () => {
        it('should return random value from company.suffixes array', () => {
          const actual = faker.company.companySuffix();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.company.suffix).toContain(actual);
        });
      });

      describe('catchPhrase()', () => {
        it('should return phrase comprising of a catch phrase adjective, descriptor, and noun', () => {
          const actual = faker.company.catchPhrase();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          const parts = actual.split(' ');

          expect(parts.length).toBeGreaterThanOrEqual(3);
        });
      });

      describe('buzzPhrase()', () => {
        it('should return phrase comprising of a buzz, adjective, and noun', () => {
          const actual = faker.company.buzzPhrase();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          const parts = actual.split(' ');

          expect(parts.length).toBeGreaterThanOrEqual(3);
        });
      });

      describe('catchPhraseAdjective()', () => {
        it('should return random value from adjective array', () => {
          const actual = faker.company.catchPhraseAdjective();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.company.adjective).toContain(actual);
        });
      });

      describe('catchPhraseDescriptor()', () => {
        it('should return random value from descriptor array', () => {
          const actual = faker.company.catchPhraseDescriptor();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.company.descriptor).toContain(actual);
        });
      });

      describe('catchPhraseNoun()', () => {
        it('should return random value from noun array', () => {
          const actual = faker.company.catchPhraseNoun();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.company.noun).toContain(actual);
        });
      });

      describe('buzzAdjective()', () => {
        it('should return random value from buzz_adjective array', () => {
          const actual = faker.company.buzzAdjective();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.company.buzz_adjective).toContain(actual);
        });
      });

      describe('buzzVerb()', () => {
        it('should return random value from buzz_verb array', () => {
          const actual = faker.company.buzzVerb();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.company.buzz_verb).toContain(actual);
        });
      });

      describe('buzzNoun()', () => {
        it('should return random value from buzz_noun array', () => {
          const actual = faker.company.buzzNoun();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.company.buzz_noun).toContain(actual);
        });
      });
    },
    {
      repeats: NON_SEEDED_BASED_RUN,
    }
  );
});
