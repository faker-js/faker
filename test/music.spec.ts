import { describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('music', () => {
  seededTests(faker, 'music', (t) => {
    t.itEach('genre', 'songName');
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('genre()', () => {
        it('should return a genre', () => {
          const genre = faker.music.genre();

          expect(genre).toBeTruthy();
          expect(genre).toBeTypeOf('string');
          expect(faker.definitions.music.genre).toContain(genre);
        });
      });

      describe('songName()', () => {
        it('returns a random song name', () => {
          const songName = faker.music.songName();

          expect(songName).toBeTruthy();
          expect(songName).toBeTypeOf('string');
          expect(faker.definitions.music.song_name).toContain(songName);
        });
      });
    }
  });
});
