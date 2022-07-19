import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededRuns } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'suffixes',
  'companyName',
  'name',
  'companySuffix',
  'catchPhrase',
  'bs',
  'catchPhraseAdjective',
  'catchPhraseDescriptor',
  'catchPhraseNoun',
  'bsAdjective',
  'bsBuzz',
  'bsNoun',
];

describe('company', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.company[functionName]();

          expect(actual).toMatchSnapshot();
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
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

        it('should return a random company name with format 0', () => {
          const actual = faker.company.name(0);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual).includes(' ');
        });

        it('should return a random company name with format 1', () => {
          const actual = faker.company.name(1);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual).includes(' - ');
        });

        it('should return a random company name with format 2', () => {
          const actual = faker.company.name(2);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual).includes(', ');
          expect(actual).includes(' and ');
        });
      });

      describe('companyName()', () => {
        it('should return a random company name', () => {
          const actual = faker.company.companyName();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
        });

        it('should return a random company name with format 0', () => {
          const actual = faker.company.companyName(0);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual).includes(' ');
        });

        it('should return a random company name with format 1', () => {
          const actual = faker.company.companyName(1);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual).includes(' - ');
        });

        it('should return a random company name with format 2', () => {
          const actual = faker.company.companyName(2);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual).includes(', ');
          expect(actual).includes(' and ');
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

      describe('bs()', () => {
        it('should return phrase comprising of a BS buzz, adjective, and noun', () => {
          const actual = faker.company.bs();

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

      describe('bsAdjective()', () => {
        it('should return random value from bs_adjective array', () => {
          const actual = faker.company.bsAdjective();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.company.bs_adjective).toContain(actual);
        });
      });

      describe('bsBuzz()', () => {
        it('should return random value from bs_verb array', () => {
          const actual = faker.company.bsBuzz();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.company.bs_verb).toContain(actual);
        });
      });

      describe('bsNoun()', () => {
        it('should return random value from bs_noun array', () => {
          const actual = faker.company.bsNoun();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.company.bs_noun).toContain(actual);
        });
      });
    }
  });
});
