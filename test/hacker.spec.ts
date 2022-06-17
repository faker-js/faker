import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      abbreviation: {
        noArgs: 'EXE',
      },
      adjective: {
        noArgs: 'cross-platform',
      },
      noun: {
        noArgs: 'array',
      },
      verb: {
        noArgs: 'navigate',
      },
      ingverb: {
        noArgs: 'copying',
      },
      phrase: {
        noArgs:
          'Try to transmit the NOR microchip, maybe it will quantify the mobile monitor!',
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      abbreviation: {
        noArgs: 'PCI',
      },
      adjective: {
        noArgs: 'open-source',
      },
      noun: {
        noArgs: 'port',
      },
      verb: {
        noArgs: 'compress',
      },
      ingverb: {
        noArgs: 'compressing',
      },
      phrase: {
        noArgs:
          'Try to generate the SAS program, maybe it will connect the back-end port!',
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      abbreviation: {
        noArgs: 'DRAM',
      },
      adjective: {
        noArgs: 'solid state',
      },
      noun: {
        noArgs: 'capacitor',
      },
      verb: {
        noArgs: 'reboot',
      },
      ingverb: {
        noArgs: 'programming',
      },
      phrase: {
        noArgs:
          "I'll back up the neural SMTP program, that should panel the CLI matrix!",
      },
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'abbreviation',
  'adjective',
  'noun',
  'verb',
  'ingverb',
  'phrase',
];

describe('name', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.hacker[functionName]();
          expect(actual).toEqual(expectations[functionName].noArgs);
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('abbreviation()', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a random abbreviation from array', () => {
          const abbreviation = faker.hacker.abbreviation();

          expect(abbreviation).toBeTypeOf('string');
          expect(abbreviation.length).toBeGreaterThan(0);
          expect(faker.definitions.hacker.abbreviation).toContain(abbreviation);
        });
      });

      describe('adjective', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a random adjective from array', () => {
          const adjective = faker.hacker.adjective();

          expect(adjective).toBeTypeOf('string');
          expect(adjective.length).toBeGreaterThan(0);
          expect(faker.definitions.hacker.adjective).toContain(adjective);
        });
      });

      describe('noun', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a random noun from array', () => {
          const noun = faker.hacker.noun();

          expect(noun).toBeTypeOf('string');
          expect(noun.length).toBeGreaterThan(0);
          expect(faker.definitions.hacker.noun).toContain(noun);
        });
      });

      describe('verb', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a random verb from array', () => {
          const verb = faker.hacker.verb();

          expect(verb).toBeTypeOf('string');
          expect(verb.length).toBeGreaterThan(0);
          expect(faker.definitions.hacker.verb).toContain(verb);
        });
      });

      describe('ingverb', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a random ingverb from array', () => {
          const ingverb = faker.hacker.ingverb();

          expect(ingverb).toBeTypeOf('string');
          expect(ingverb.length).toBeGreaterThan(0);
          expect(faker.definitions.hacker.ingverb).toContain(ingverb);
        });
      });

      describe('phrase', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a random phrase from array', () => {
          const phrase = faker.hacker.phrase();

          expect(phrase).toBeTypeOf('string');
          expect(phrase.length).toBeGreaterThan(0);
        });
      });
    }
  });
});
