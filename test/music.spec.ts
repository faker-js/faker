import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededRuns } from './support/seededRuns';

const functionNames = ['genre', 'songName'];

const NON_SEEDED_BASED_RUN = 5;

describe('music', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.music[functionName]();

          expect(actual).toMatchSnapshot();
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
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
