import type { MockInstance } from 'vitest';
import { describe, expect, it, vi } from 'vitest';
import { SimpleFaker, simpleFaker } from '../src';
import { keys } from '../src/internal/keys';

describe('simpleFaker', () => {
  it('should not log anything on startup', () => {
    const spies: MockInstance[] = keys(console)
      .filter((key) => typeof console[key] === 'function')
      .map((methodName) => vi.spyOn(console, methodName));

    // eslint-disable-next-line @typescript-eslint/no-var-requires, unicorn/prefer-module -- Using import() requires types being build but the CI / TS-Check runs without them.
    require('..').simpleFaker;

    new SimpleFaker();

    for (const spy of spies) {
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    }
  });

  describe('randomizer', () => {
    it('should be possible to provide a custom Randomizer', () => {
      const randomizer = {
        next: () => 0,
        seed: () => void 0,
        clone: () => randomizer,
      };
      const customFaker = new SimpleFaker({
        randomizer,
      });

      expect(customFaker.number.int()).toBe(0);
      expect(customFaker.number.int()).toBe(0);
      expect(customFaker.number.int()).toBe(0);
    });
  });

  // This is only here for coverage
  // The actual test is in mersenne.spec.ts
  describe('seed()', () => {
    it('seed()', () => {
      const seed = simpleFaker.seed();

      expect(seed).toBeDefined();
      expect(seed).toBeTypeOf('number');
    });

    it('should reset the sequence when calling `seed`', () => {
      const seed = simpleFaker.seed();

      const num1 = simpleFaker.number.int();

      const newSeed = simpleFaker.seed(seed);
      const num2 = simpleFaker.number.int();

      expect(num1).toBe(num2);
      expect(newSeed).toBe(seed);

      const num3 = simpleFaker.number.int();
      expect(num1).not.toBe(num3);
    });

    it('seed(number)', () => {
      simpleFaker.seed(1);

      const actual = simpleFaker.string.uuid();
      expect(actual).toBe('6fbe024f-2316-4265-aa6e-8d65a837e308');
    });

    it('seed(number[])', () => {
      simpleFaker.seed([1, 2, 3]);

      const actual = simpleFaker.string.uuid();
      expect(actual).toBe('95e97ae6-08ee-492f-9895-ec8be3410e88');
    });
  });

  describe('clone()', () => {
    it('should create a clone that returns the same values as the original', () => {
      const clone1 = simpleFaker.clone();
      const clone2 = simpleFaker.clone();
      const clone3 = clone1.clone();

      expect(clone1).not.toBe(simpleFaker);
      expect(clone2).not.toBe(simpleFaker);
      expect(clone3).not.toBe(simpleFaker);
      expect(clone1).not.toBe(clone2);
      expect(clone1).not.toBe(clone3);
      expect(clone2).not.toBe(clone3);

      const value0 = simpleFaker.number.int();
      expect(clone1.number.int()).toBe(value0);
      expect(clone2.number.int()).toBe(value0);
      expect(clone3.number.int()).toBe(value0);

      const value1 = clone1.number.int();
      expect(simpleFaker.number.int()).toBe(value1);
      expect(clone2.number.int()).toBe(value1);
      expect(clone3.number.int()).toBe(value1);

      const value2 = clone2.number.int();
      expect(clone1.number.int()).toBe(value2);
      expect(simpleFaker.number.int()).toBe(value2);
      expect(clone3.number.int()).toBe(value2);

      const value3 = clone3.number.int();
      expect(clone1.number.int()).toBe(value3);
      expect(clone2.number.int()).toBe(value3);
      expect(simpleFaker.number.int()).toBe(value3);
    });
  });

  describe('derive()', () => {
    it("should create a derived faker, that doesn't affect the original", () => {
      const seed = simpleFaker.seed();
      simpleFaker.number.int();
      const value = simpleFaker.number.int();

      simpleFaker.seed(seed);
      const derived = simpleFaker.derive();

      expect(derived).not.toBe(simpleFaker);

      for (let i = 0; i < derived.number.int(100); i++) {
        derived.number.int();
      }

      expect(simpleFaker.number.int()).toBe(value);
    });
  });

  describe('defaultRefDate', () => {
    it('should be a defined', () => {
      expect(simpleFaker.defaultRefDate).toBeDefined();
    });

    it('should be a date in the very recent past', () => {
      const start = Date.now();
      const refDate = simpleFaker.defaultRefDate().getTime();
      const end = Date.now();
      expect(refDate).toBeGreaterThanOrEqual(start);
      expect(refDate).toBeLessThanOrEqual(end);
    });
  });
});
