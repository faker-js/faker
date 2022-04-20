import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      adjective: {
        noArgs: 'harmonious',
        length10: 'gregarious',
        length20: 'harmonious',
      },
      adverb: {
        noArgs: 'jealously',
        length10: 'generously',
        length20: 'jealously',
      },
      conjunction: {
        noArgs: 'however',
        length10: 'as much as',
        length20: 'however',
      },
      interjection: {
        noArgs: 'yahoo',
        length10: 'yahoo',
        length20: 'yahoo',
      },
      noun: {
        noArgs: 'gale',
        length10: 'exposition',
        length20: 'gale',
      },
      preposition: {
        noArgs: 'concerning',
        length10: 'throughout',
        length20: 'concerning',
      },
      verb: {
        noArgs: 'function',
        length10: 'exasperate',
        length20: 'function',
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      adjective: {
        noArgs: 'fabulous',
        length10: 'enchanting',
        length20: 'fabulous',
      },
      adverb: {
        noArgs: 'frankly',
        length10: 'enormously',
        length20: 'frankly',
      },
      conjunction: {
        noArgs: 'even if',
        length10: 'as long as',
        length20: 'even if',
      },
      interjection: {
        noArgs: 'ew',
        length10: 'ew',
        length20: 'ew',
      },
      noun: {
        noArgs: 'digit',
        length10: 'depressive',
        length20: 'digit',
      },
      preposition: {
        noArgs: 'barring',
        length10: 'concerning',
        length20: 'barring',
      },
      verb: {
        noArgs: 'dispense',
        length10: 'demoralize',
        length20: 'dispense',
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      adjective: {
        noArgs: 'verifiable',
        length10: 'unfinished',
        length20: 'verifiable',
      },
      adverb: {
        noArgs: 'viciously',
        length10: 'unbearably',
        length20: 'viciously',
      },
      conjunction: {
        noArgs: 'whereas',
        length10: 'as soon as',
        length20: 'whereas',
      },
      interjection: {
        noArgs: 'er',
        length10: 'er',
        length20: 'er',
      },
      noun: {
        noArgs: 'trick',
        length10: 'trafficker',
        length20: 'trick',
      },
      preposition: {
        noArgs: 'upon',
        length10: 'underneath',
        length20: 'upon',
      },
      verb: {
        noArgs: 'trick',
        length10: 'trampoline',
        length20: 'trick',
      },
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'adjective',
  'adverb',
  'conjunction',
  'interjection',
  'noun',
  'preposition',
  'verb',
];

describe('word', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.word[functionName]();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual).toEqual(expectations[functionName].noArgs);
        });

        it(`${functionName}(10)`, () => {
          faker.seed(seed);

          const actual = faker.word[functionName](10);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual).toEqual(expectations[functionName].length10);
        });

        it(`${functionName}(20)`, () => {
          faker.seed(seed);

          const actual = faker.word[functionName](20);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual).toEqual(expectations[functionName].length20);
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seedValue
  )}`, () => {
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
