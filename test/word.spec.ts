import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      adjective: {
        noArgs: 'harmonious',
        length10: 'gregarious',
        length20: 'stable',
      },
      adverb: {
        noArgs: 'jealously',
        length10: 'generously',
        length20: 'swiftly',
      },
      conjunction: {
        noArgs: 'however',
        length10: 'as much as',
        length20: 'since',
      },
      interjection: {
        noArgs: 'yahoo',
        length10: 'ack',
        length20: 'ack',
      },
      noun: {
        noArgs: 'gale',
        length10: 'exposition',
        length20: 'shift',
      },
      preposition: {
        noArgs: 'concerning',
        length10: 'throughout',
        length20: 'than',
      },
      verb: {
        noArgs: 'function',
        length10: 'exasperate',
        length20: 'shred',
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      adjective: {
        noArgs: 'fabulous',
        length10: 'enchanting',
        length20: 'neat',
      },
      adverb: {
        noArgs: 'frankly',
        length10: 'enormously',
        length20: 'overconfidently',
      },
      conjunction: {
        noArgs: 'even if',
        length10: 'as long as',
        length20: 'instead',
      },
      interjection: {
        noArgs: 'ew',
        length10: 'yippee',
        length20: 'yippee',
      },
      noun: {
        noArgs: 'digit',
        length10: 'depressive',
        length20: 'might',
      },
      preposition: {
        noArgs: 'barring',
        length10: 'concerning',
        length20: 'midst',
      },
      verb: {
        noArgs: 'dispense',
        length10: 'demoralize',
        length20: 'nearest',
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      adjective: {
        noArgs: 'verifiable',
        length10: 'unfinished',
        length20: 'joyous',
      },
      adverb: {
        noArgs: 'viciously',
        length10: 'unbearably',
        length20: 'loudly',
      },
      conjunction: {
        noArgs: 'whereas',
        length10: 'as soon as',
        length20: 'in addition',
      },
      interjection: {
        noArgs: 'er',
        length10: 'gah',
        length20: 'gah',
      },
      noun: {
        noArgs: 'trick',
        length10: 'trafficker',
        length20: 'infection',
      },
      preposition: {
        noArgs: 'upon',
        length10: 'underneath',
        length20: 'for',
      },
      verb: {
        noArgs: 'trick',
        length10: 'trampoline',
        length20: 'intercede',
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

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${faker.seedValue}`, () => {
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
