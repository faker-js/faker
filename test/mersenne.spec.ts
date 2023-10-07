import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import {
  generateMersenne32Randomizer,
  generateMersenne53Randomizer,
} from '../src/internal/mersenne';
import type { Randomizer } from '../src/randomizer';
import { seededRuns } from './support/seededRuns';
import { times } from './support/times';

const NON_SEEDED_BASED_RUN = 25;

describe.each([
  ['generateMersenne32Randomizer()', generateMersenne32Randomizer],
  ['generateMersenne53Randomizer()', generateMersenne53Randomizer],
])('%s', (_, factory) => {
  const randomizer: Randomizer = factory();

  it('should return a result matching the interface', () => {
    expect(randomizer).toBeDefined();
    expect(randomizer).toBeTypeOf('object');
    expect(randomizer.next).toBeTypeOf('function');
    expect(randomizer.seed).toBeTypeOf('function');
  });

  describe.each(
    [...seededRuns, ...seededRuns.map((v) => [v, 1, 2])].map((v) => [v])
  )('seed: %j', (seed) => {
    beforeEach(() => {
      randomizer.seed(seed);
    });

    it('should return deterministic value for next()', () => {
      const actual = randomizer.next();

      expect(actual).toMatchSnapshot();
    });
  });

  function randomSeed(): number {
    return Math.ceil(Math.random() * 1_000_000_000);
  }

  // Create and log-back the seed for debug purposes
  describe.each(
    times(NON_SEEDED_BASED_RUN).flatMap(() => [
      [randomSeed()],
      [[randomSeed(), randomSeed()]],
    ])
  )('random seeded tests %j', (seed) => {
    beforeAll(() => {
      randomizer.seed(seed);
    });

    describe('next', () => {
      it('should return random number from interval [0, 1)', () => {
        const actual = randomizer.next();

        expect(actual).toBeGreaterThanOrEqual(0);
        expect(actual).toBeLessThan(1);
      });
    });
  });
});
