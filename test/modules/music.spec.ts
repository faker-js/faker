import { describe, expect, it } from 'vitest';
import { faker } from '../../src';
import { seededTests } from '../support/seeded-runs';
import { times } from './../support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('music', () => {
  seededTests(faker, 'music', (t) => {
    t.itEach('album', 'artist', 'genre', 'songName');
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('album()', () => {
        it('should return an album name', () => {
          const album = faker.music.album();

          expect(album).toBeTruthy();
          expect(album).toBeTypeOf('string');
          expect(faker.definitions.music.album).toContain(album);
        });
      });

      describe('artist()', () => {
        it('should return an artist', () => {
          const artist = faker.music.artist();

          expect(artist).toBeTruthy();
          expect(artist).toBeTypeOf('string');
          expect(faker.definitions.music.artist).toContain(artist);
        });
      });

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
  );
});
