import { describe, expect, it, vi } from 'vitest';
import { randomSeed } from '../../src/internal/seed';

describe('seed', () => {
  it('should generate a seed from Math.random', () => {
    const random = 0.5;
    const spy = vi.spyOn(Math, 'random').mockReturnValue(random);

    expect(randomSeed()).toBe(Math.ceil(random * Number.MAX_SAFE_INTEGER));
    spy.mockRestore();
  });
});
