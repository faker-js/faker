import { beforeEach, describe, expect, it, vi } from 'vitest';
import { faker } from '../dist/cjs';

describe('unique', () => {
  describe('unique()', () => {
    beforeEach(() => {
      faker.seed(222);
    });

    it('is able to call a function with no arguments and return a result', () => {
      const result = faker.unique(faker.internet.email);
      expect(typeof result).toBe('string');
    });

    it('is able to call a function with arguments and return a result', () => {
      const spy_internet_email = vi.spyOn(faker.internet, 'email');
      expect(spy_internet_email).toHaveBeenCalledTimes(0);
      const result = faker.unique(faker.internet.email, ['a', 'b', 'c']); // third argument is provider, or domain for email
      expect(spy_internet_email).toHaveBeenCalledTimes(1);
      expect(result).toMatch(/\@c/);
    });

    it('is able to call same function with arguments and return a result', () => {
      const spy_internet_email = vi.spyOn(faker.internet, 'email');
      expect(spy_internet_email).toHaveBeenCalledTimes(0);
      const result = faker.unique(faker.internet.email, ['a', 'b', 'c']); // third argument is provider, or domain for email
      expect(spy_internet_email).toHaveBeenCalledTimes(2);
      expect(result).toMatch(/\@c/);
    });

    it('is able to call same function with arguments and return a result', () => {
      const spy_internet_email = vi.spyOn(faker.internet, 'email');
      expect(spy_internet_email).toHaveBeenCalledTimes(0);
      const result = faker.unique(faker.internet.email, ['a', 'b', 'c']); // third argument is provider, or domain for email
      expect(spy_internet_email).toHaveBeenCalledTimes(3);
      expect(result).toMatch(/\@c/);
    });

    it('is able to call same function with arguments and return a result', () => {
      const spy_internet_email = vi.spyOn(faker.internet, 'email');
      expect(spy_internet_email).toHaveBeenCalledTimes(0);
      const result = faker.unique(faker.internet.email, ['a', 'b', 'c']); // third argument is provider, or domain for email
      expect(spy_internet_email).toHaveBeenCalledTimes(4);
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
