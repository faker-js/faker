import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { FakerError } from '../src/errors/faker-error';
import { Mersenne } from '../src/modules/mersenne';
import { seededRuns } from './support/seededRuns';

const minMaxTestCases = [
  { max: 100, min: 0 },
  { max: undefined, min: 0 },
  { max: 100, min: undefined },
];

const functionNames = ['rand'];

const NON_SEEDED_BASED_RUN = 25;

describe('mersenne twister', () => {
  let mersenne: Mersenne;

  beforeEach(() => {
    mersenne = new Mersenne();
  });

  for (const seed of [...seededRuns, [42, 1, 2], [1337, 1, 2], [1211, 1, 2]]) {
    describe(`seed: ${JSON.stringify(seed)}`, () => {
      beforeEach(() => {
        if (Array.isArray(seed)) {
          mersenne.seed_array(seed);
        } else {
          mersenne.seed(seed);
        }
      });

      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          const actual = mersenne[functionName]();

          expect(actual).toMatchSnapshot();
        });
      }

      for (const { min, max } of minMaxTestCases) {
        it(`should return deterministic values for rand(${max}, ${min})`, () => {
          const actual = mersenne.rand(max, min);

          expect(actual).toMatchSnapshot();
        });
      }

      it.todo(`should return 0 for rand(1)`, () => {
        const actual = mersenne.rand(1);

        expect(actual).toEqual(0);
      });
    });
  }

  // Create and log-back the seed for debug purposes
  const seeds = [
    Math.ceil(Math.random() * 1_000_000_000),
    [
      Math.ceil(Math.random() * 1_000_000_000),
      Math.ceil(Math.random() * 1_000_000_000),
    ],
  ];

  for (const seed of seeds) {
    describe(`random seeded tests ${JSON.stringify(seed)}`, () => {
      beforeAll(() => {
        if (Array.isArray(seed)) {
          mersenne.seed_array(seed);
        } else {
          mersenne.seed(seed);
        }
      });

      for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
        describe('rand', () => {
          it('should return a random number without given min / max arguments', () => {
            const randomNumber = mersenne.rand();
            expect(randomNumber).toBeTypeOf('number');
          });

          it('should return random number from interval [min, max)', () => {
            const actual = mersenne.rand(0, 2);

            expect(actual).toBeGreaterThanOrEqual(0);
            expect(actual).toBeLessThan(2);
          });
        });
      }
    });
  }

  it('should throw an error when attempting to seed() a non-integer', () => {
    expect(() =>
      mersenne.seed(
        // @ts-expect-error: non-integer error
        'abc'
      )
    ).toThrowError(
      new FakerError('seed(S) must take numeric argument; is string')
    );
  });

  it('should throw an error when attempting to seed() a non-integer', () => {
    expect(() =>
      mersenne.seed_array(
        // @ts-expect-error: non-integer error
        'abc'
      )
    ).toThrowError(
      new FakerError('seed_array(A) must take array of numbers; is string')
    );
  });
});
