import { describe, expect, it } from 'vitest';
import { faker } from '../lib/cjs';

faker.seed(1234);

describe('music', () => {
  describe('genre()', () => {
    it('returns a genre', () => {
      const genre = faker.music.genre();

      expect(genre).toBe('Electronic');
    });
  });
});
