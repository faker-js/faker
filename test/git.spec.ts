import validator from 'validator';
import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      branch: {
        noArgs: 'array-transmit',
      },
      commitEntry: {
        noArgs: '',
      },
      commitMessage: {
        noArgs: 'navigate neural capacitor',
      },
      commitSha: {
        noArgs: '5cf2bc99272107d592ba00fbdf302f2949806048',
      },
      shortSha: {
        noArgs: '5cf2bc9',
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      branch: {
        noArgs: 'port-quantify',
      },
      commitEntry: {
        noArgs: '',
      },
      commitMessage: {
        noArgs: 'compress multi-byte panel',
      },
      commitSha: {
        noArgs: '48234870538945f4b41c61a52bf27dccc0576698',
      },
      shortSha: {
        noArgs: '4823487',
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      branch: {
        noArgs: 'capacitor-connect',
      },
      commitEntry: {
        noArgs: '',
      },
      commitMessage: {
        noArgs: 'reboot online circuit',
      },
      commitSha: {
        noArgs: 'e7ec32f0a2a3c652bbd0caabde64dfdf379e3259',
      },
      shortSha: {
        noArgs: 'e7ec32f',
      },
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'branch',
  'commitEntry',
  'commitMessage',
  'commitSha',
  'shortSha',
];

describe('git', () => {
  afterEach(() => {
    faker.localeOrder = ['en'];
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        if (functionName === 'commitEntry') {
          it.todo(`${functionName}()`);
          continue;
        }

        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.git[functionName]();
          expect(actual).toEqual(expectations[functionName].noArgs);
        });
      }
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seedValue
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('branch()', () => {
        it('should return a random branch', () => {
          const branch = faker.git.branch();

          expect(branch).toBeTruthy();
          expect(branch).toBeTypeOf('string');
          expect(branch).satisfy(validator.isSlug);
        });
      });

      describe('commitEntry', () => {
        it('should return a random commitEntry', () => {
          const commitEntry = faker.git.commitEntry();

          expect(commitEntry).toBeTruthy();
          expect(commitEntry).toBeTypeOf('string');

          const parts = commitEntry.split(/\r?\n/);

          expect(parts.length).greaterThanOrEqual(6);
          expect(parts.length).lessThanOrEqual(7);

          expect(parts[0]).match(/^commit [a-f0-9]+$/);
          if (parts.length === 7) {
            expect(parts[1]).match(/^Merge: [a-f0-9]+ [a-f0-9]+$/);
            expect(parts[2]).match(/^Author: \w+ \w+ \<[\w\.]+@[\w\.]+\>$/);
            expect(parts[3]).match(/^Date: .+$/);
            expect(parts[4]).toBe('');
            expect(parts[5]).match(/^\s{4}.+$/);
          } else {
            expect(parts[1]).match(/^Author: \w+ \w+ \<[\w\.]+@[\w\.]+\>$/);
            expect(parts[2]).match(/^Date: .+$/);
            expect(parts[3]).toBe('');
            expect(parts[4]).match(/^\s{4}.+$/);
          }
        });
      });

      describe('commitMessage', () => {
        it('should return a random commitMessage', () => {
          const commitMessage = faker.git.commitMessage();

          expect(commitMessage).toBeTruthy();
          expect(commitMessage).toBeTypeOf('string');

          const parts = commitMessage.split(' ');
          expect(parts.length).greaterThanOrEqual(3);
        });
      });

      describe('commitSha', () => {
        it('should return a random commitSha', () => {
          const commitSha = faker.git.commitSha();

          expect(commitSha).toBeTruthy();
          expect(commitSha).toBeTypeOf('string');
          expect(commitSha).satisfy(validator.isHexadecimal);
          expect(commitSha).toHaveLength(40);
        });
      });

      describe('shortSha', () => {
        it('should return a random shortSha', () => {
          const shortSha = faker.git.shortSha();

          expect(shortSha).toBeTruthy();
          expect(shortSha).toBeTypeOf('string');
          expect(shortSha).satisfy(validator.isHexadecimal);
          expect(shortSha).toHaveLength(7);
        });
      });
    }
  });
});
