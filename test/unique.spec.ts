import { describe, expect, it } from 'vitest';
import { faker } from '../lib/cjs';

describe('unique', () => {
  describe('unique()', () => {
    it('is able to call a function with no arguments and return a result', () => {
      const result =
        // @ts-expect-error
        faker.unique(faker.internet.email);
      expect(typeof result).toBe('string');
    });

    it('is able to call a function with arguments and return a result', () => {
      const result = faker.unique(faker.internet.email, ['a', 'b', 'c']); // third argument is provider, or domain for email
      expect(result).toMatch(/\@c/);
    });

    it('is able to call same function with arguments and return a result', () => {
      const result = faker.unique(faker.internet.email, ['a', 'b', 'c']); // third argument is provider, or domain for email
      expect(result).toMatch(/\@c/);
    });

    it('is able to exclude results as array', () => {
      const result = faker.unique(faker.internet.protocol, [], {
        exclude: ['https'],
      });
      expect(result).toBe('http');
    });

    it('is able to limit unique call by maxTime in ms', () => {
      let result;
      try {
        result = faker.unique(faker.internet.protocol, [], {
          maxTime: 1,
          maxRetries: 9999,
          exclude: ['https', 'http'],
        });
      } catch (err) {
        expect(err.message.substr(0, 16)).toBe('Exceeded maxTime');
      }
    });

    it('is able to limit unique call by maxRetries', () => {
      let result;
      try {
        result = faker.unique(faker.internet.protocol, [], {
          maxTime: 5000,
          maxRetries: 5,
          exclude: ['https', 'http'],
        });
      } catch (err) {
        expect(err.message.substr(0, 19)).toBe('Exceeded maxRetries');
      }
    });

    it('is able to call last function with arguments and return a result', () => {
      const result = faker.unique(faker.internet.email, ['a', 'b', 'c']); // third argument is provider, or domain for email
      expect(result).toMatch(/\@c/);
    });
  });
});
