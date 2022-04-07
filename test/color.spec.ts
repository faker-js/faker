import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      human: 'grey',
      rgb: '0x8BE4AB',
      rgba: '0xBE4ABd5e',
      rgbNumeric: [95, 203, 243],
      rgbaNumeric: [95, 203, 243, 0.2],
    },
  },
  {
    seed: 1337,
    expectations: {
      human: 'black',
      rgb: '0x5c346b',
      rgba: '0xc346ba42',
      rgbNumeric: [67, 143, 40],
      rgbaNumeric: [67, 143, 40, 0.2],
    },
  },
  {
    seed: 1211,
    expectations: {
      human: 'azure',
      rgb: '0xEaDB42',
      rgba: '0xaDB42Fed',
      rgbNumeric: [237, 117, 228],
      rgbaNumeric: [237, 117, 228, 0.8],
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = ['human', 'rgb', 'rgba', 'rgbNumeric', 'rgbaNumeric'];

describe('color', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.color[functionName]();
          expect(actual).toEqual(expectations[functionName]);
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
      describe(`human()`, () => {
        it('should return random human readable color from human color array', () => {
          const color = faker.color.human();
          expect(faker.definitions.color.human).toContain(color);
        });
      });

      describe(`rgb()`, () => {
        it('should return a random rgb hex color', () => {
          const color = faker.color.rgb();
          expect(color).match(/^(0x[a-fA-F0-9]{6})$/);
        });
      });

      describe(`rgb_numeric()`, () => {
        it('should return a random rgb color in decimal format', () => {
          const color = faker.color.rgbNumeric();
          expect(color).length(3);
          color.forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(255);
          });
        });
      });

      describe(`rgba()`, () => {
        it('should return a random rgba hex color', () => {
          const color = faker.color.rgba();
          expect(color).match(/^(0x[a-fA-F0-9]{8})$/);
        });
      });

      describe(`rgba_numeric()`, () => {
        it('should return a random rgba color in decimal format', () => {
          const color = faker.color.rgbaNumeric();
          expect(color).length(4);
          color.slice(0, 3).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(255);
          });
          expect(color[color.length - 1]).toBeGreaterThanOrEqual(0);
          expect(color[color.length - 1]).toBeLessThanOrEqual(1);
        });
      });
    }
  });
});
