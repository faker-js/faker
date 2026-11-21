import type { MockInstance } from 'vitest';
import { describe, expect, it, vi } from 'vitest';
import { keys } from '../src/internal/keys';

describe('index.ts', { timeout: 10_000 }, () => {
  it('should not log anything on startup', async () => {
    const spies: MockInstance[] = keys(console)
      .filter((key) => typeof console[key] === 'function')
      .map((methodName) => vi.spyOn(console, methodName));

    vi.resetModules();
    const { simpleFaker, faker, SimpleFaker, Faker } = await import('..');

    expect(simpleFaker).toBeDefined();
    expect(faker).toBeDefined();

    expect(SimpleFaker).toBeDefined();
    expect(Faker).toBeDefined();

    expect(new SimpleFaker()).toBeDefined();
    expect(new Faker()).toBeDefined();

    for (const spy of spies) {
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    }
  });
});
