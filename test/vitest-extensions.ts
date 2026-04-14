/* eslint-disable @typescript-eslint/no-empty-object-type */
import { expect } from 'vitest';

expect.extend({
  toContainDuplicates(received: unknown[]) {
    const { isNot } = this;

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
  toStartWith(actual: unknown, prefix: string) {
    const { isNot } = this;

    return {
      pass: typeof actual === 'string' && actual.startsWith(prefix),
      actual,
      expected: `${prefix}...`,
      message: () =>
        isNot
          ? `String did start with the "${prefix}".`
          : `String did not start with the "${prefix}".`,
    };
  },
});

interface CustomMatchers {
  /**
   * Expects that a list of elements does not contain any duplicate entries.
   */
  toContainDuplicates(): void;

  /**
   * Expects that a string has the provided prefix.
   *
   * @param prefix The prefix to check for.
   */
  toStartWith(prefix: string): void;
}

declare module 'vitest' {
  interface Assertion extends CustomMatchers {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
