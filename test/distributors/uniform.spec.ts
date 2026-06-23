import { describe, expect, it } from 'vitest';
import { uniformDistributor } from '../../src/distributors/uniform';
import { generateMersenne53Randomizer } from '../../src/utils/mersenne';

describe('uniformDistributor', () => {
  it('should generate a uniform distribution', () => {
    const distributor = uniformDistributor();
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
});
