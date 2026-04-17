import { describe, expect, it } from 'vitest';
import { exponentialDistributor } from '../../src/distributors/exponential';
import { FakerError } from '../../src/errors/faker-error';
import { generateMersenne53Randomizer } from '../../src/utils/mersenne';

describe('exponentialDistributor', () => {
  it('should generate an exponential distribution', () => {
    const distributor = exponentialDistributor();
    const randomizer = generateMersenne53Randomizer(0);

    const results = Array.from({ length: 10 }, () => 0);

    for (let i = 0; i < 1000; i++) {
      const value = distributor(randomizer);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
      results[Math.floor(value * 10)]++;
    }

    expect(results[0]).toBeGreaterThan(125);
    expect(results[9]).toBeLessThan(85);
  });

  it('should prefer base over bias if both are set', () => {
    const distributor = exponentialDistributor({ base: 0.1, bias: -9 });
    const randomizer = generateMersenne53Randomizer(0);

    const results = Array.from({ length: 10 }, () => 0);
    for (let i = 0; i < 1000; i++) {
      const value = distributor(randomizer);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
      results[Math.floor(value * 10)]++;
    }

    expect(results[0]).toBeLessThan(50);
    expect(results[9]).toBeGreaterThan(250);
  });

  describe('base option', () => {
    it('should throw an error if base is invalid', () => {
      expect(() => exponentialDistributor({ base: 0 })).toThrow(
        new FakerError('Base should be greater than 0.')
      );
      expect(() => exponentialDistributor({ base: -1 })).toThrow(
        new FakerError('Base should be greater than 0.')
      );
    });

    it('should generate a distribution biased towards the maximum value when base is less than 1', () => {
      const distributor = exponentialDistributor({ base: 0.1 });
      const randomizer = generateMersenne53Randomizer(0);

      const results = Array.from({ length: 10 }, () => 0);
      for (let i = 0; i < 1000; i++) {
        const value = distributor(randomizer);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
        results[Math.floor(value * 10)]++;
      }

      expect(results[0]).toBeLessThan(50);
      expect(results[9]).toBeGreaterThan(250);
    });

    it('should generate a uniform distribution when base is 1', () => {
      const distributor = exponentialDistributor({ base: 1 });
      const randomizer = generateMersenne53Randomizer(0);

      const results = Array.from({ length: 10 }, () => 0);

      for (let i = 0; i < 1000; i++) {
        const value = distributor(randomizer);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
        results[Math.floor(value * 10)]++;
      }

      for (const [index, count] of results.entries()) {
        expect(count, `Bucket ${index} has too few values`).toBeGreaterThan(75);
        expect(count, `Bucket ${index} has too many values`).toBeLessThan(125);
      }
    });

    it('should generate a distribution biased towards the minimum value when base is greater than 1', () => {
      const distributor = exponentialDistributor({ base: 10 });
      const randomizer = generateMersenne53Randomizer(0);

      const results = Array.from({ length: 10 }, () => 0);
      for (let i = 0; i < 1000; i++) {
        const value = distributor(randomizer);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
        results[Math.floor(value * 10)]++;
      }

      expect(results[0]).toBeGreaterThan(250);
      expect(results[9]).toBeLessThan(50);
    });
  });

  describe('bias option', () => {
    it('should generate a distribution biased towards the minimum value when bias is negative', () => {
      const distributor = exponentialDistributor({ bias: -9 });
      const randomizer = generateMersenne53Randomizer(0);

      const results = Array.from({ length: 10 }, () => 0);
      for (let i = 0; i < 1000; i++) {
        const value = distributor(randomizer);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
        results[Math.floor(value * 10)]++;
      }

      expect(results[0]).toBeGreaterThan(250);
      expect(results[9]).toBeLessThan(50);
    });

    it('should generate a uniform distribution when bias is 0', () => {
      const distributor = exponentialDistributor({ bias: 0 });
      const randomizer = generateMersenne53Randomizer(0);

      const results = Array.from({ length: 10 }, () => 0);

      for (let i = 0; i < 1000; i++) {
        const value = distributor(randomizer);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
        results[Math.floor(value * 10)]++;
      }

      for (const [index, count] of results.entries()) {
        expect(count, `Bucket ${index} has too few values`).toBeGreaterThan(75);
        expect(count, `Bucket ${index} has too many values`).toBeLessThan(125);
      }
    });

    it('should generate a distribution biased towards the maximum value when bias is positive', () => {
      const distributor = exponentialDistributor({ bias: 9 });
      const randomizer = generateMersenne53Randomizer(0);

      const results = Array.from({ length: 10 }, () => 0);
      for (let i = 0; i < 1000; i++) {
        const value = distributor(randomizer);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
        results[Math.floor(value * 10)]++;
      }

      expect(results[0]).toBeLessThan(50);
      expect(results[9]).toBeGreaterThan(250);
    });
  });
});
