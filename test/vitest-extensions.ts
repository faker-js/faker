/* eslint-disable @typescript-eslint/no-empty-object-type */
import { expect } from 'vitest';

expect.extend({
  toContainDuplicates<T>(received: T[]) {
    const { isNot = false } = this;

    const uniques = new Set(received);
    const duplications = received.filter((entry) => !uniques.delete(entry));
    const uniqueDuplication = [...new Set(duplications)];

    return {
      pass: uniqueDuplication.length > 0,
      message: () =>
        isNot
          ? `Duplicated values are [${uniqueDuplication.join(', ')}]`
          : `No duplicate values in [${received.join(', ')}]`,
    };
  },
});

interface CustomMatchers {
  toContainDuplicates(): void;
}

declare module 'vitest' {
  interface Assertion extends CustomMatchers {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
