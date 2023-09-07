import type { SpyInstance } from 'vitest';
import { describe, expect, it, vi } from 'vitest';
import { baseFaker, BaseFaker } from '../src';

describe('baseFaker', () => {
  it('should not log anything on startup', () => {
    const spies: SpyInstance[] = Object.keys(console)
      .filter((key) => typeof console[key] === 'function')
      .map((methodName) =>
        vi.spyOn(console, methodName as keyof typeof console)
      );

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('..').baseFaker;

    new BaseFaker();

    for (const spy of spies) {
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    }
  });

  // This is only here for coverage
  // The actual test is in mersenne.spec.ts
  describe('seed()', () => {
    it('seed()', () => {
      const seed = baseFaker.seed();

      expect(seed).toBeDefined();
      expect(seed).toBeTypeOf('number');
    });

    it('should reset the sequence when calling `seed`', () => {
      const seed = baseFaker.seed();

      const num1 = baseFaker.number.int();

      const newSeed = baseFaker.seed(seed);
      const num2 = baseFaker.number.int();

      expect(num1).toBe(num2);
      expect(newSeed).toBe(seed);

      const num3 = baseFaker.number.int();
      expect(num1).not.toBe(num3);
    });

    it('seed(number)', () => {
      baseFaker.seed(1);

      const actual = baseFaker.string.uuid();
      expect(actual).toBe('6fbe024f-2316-4265-aa6e-8d65a837e308');
    });

    it('seed(number[])', () => {
      baseFaker.seed([1, 2, 3]);

      const actual = baseFaker.string.uuid();
      expect(actual).toBe('95e97ae6-08ee-492f-9895-ec8be3410e88');
    });
  });

  describe('defaultRefDate', () => {
    it('should be a defined', () => {
      expect(baseFaker.defaultRefDate).toBeDefined();
    });

    it('should be a date in the very recent past', () => {
      const start = Date.now();
      const refDate = baseFaker.defaultRefDate().getTime();
      const end = Date.now();
      expect(refDate).toBeGreaterThanOrEqual(start);
      expect(refDate).toBeLessThanOrEqual(end);
    });
  });
});
