import { expect } from 'vitest';

expect.extend({
  toBeUnique<T>(received: T[]) {
    const uniques = new Set(received);
    const duplications = received.filter((entry) => !uniques.delete(entry));
    const uniqueDuplication = [...new Set(duplications)];

    return {
      pass: uniqueDuplication.length === 0,
      message: () => `Duplicated values are: [${uniqueDuplication.join(', ')}]`,
    };
  },
});

interface CustomMatchers {
  toBeUnique(): void;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Assertion extends CustomMatchers {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }
}
