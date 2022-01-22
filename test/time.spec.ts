import { describe, expect, it } from 'vitest';
import { faker } from '../lib/cjs';

faker.seed(1234);

describe('time', () => {
  describe('recent()', () => {
    it('returns the recent timestamp in Unix time format', () => {
      const date = faker.time.recent();
      expect(typeof date).toBe('number');
    });

    it('returns the recent timestamp in full time string format', () => {
      const date = faker.time.recent('wide');
      expect(typeof date).toBe('string');
    });

    it('returns the recent timestamp in abbreviated string format', () => {
      const date = faker.time.recent('abbr');
      expect(typeof date).toBe('string');
    });
  });
});
