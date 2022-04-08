import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      human: 'grey',
      rgbHex: '0x8BE4AB',
      rgbaHex: '0x8BE4ABdd',
      rgbNumeric: [95, 203, 243],
      rgbaNumeric: [95, 203, 243, 0.18],
      hsl: [135, 0.8, 0.96],
      hsla: [135, 0.8, 0.96, 0.18],
    },
  },
  {
    seed: 1337,
    expectations: {
      human: 'black',
      rgbHex: '0x5c346b',
      rgbaHex: '0x5c346ba0',
      rgbNumeric: [67, 143, 40],
      rgbaNumeric: [67, 143, 40, 0.21],
      hsl: [94, 0.56, 0.16],
      hsla: [94, 0.56, 0.16, 0.21],
    },
  },
  {
    seed: 1211,
    expectations: {
      human: 'azure',
      rgbHex: '0xEaDB42',
      rgbaHex: '0xEaDB42F0',
      rgbNumeric: [237, 117, 228],
      rgbaNumeric: [237, 117, 228, 0.78],
      hsl: [335, 0.46, 0.9],
      hsla: [335, 0.46, 0.9, 0.78],
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'human',
  'rgbHex',
  'rgbaHex',
  'rgbNumeric',
  'rgbaNumeric',
  'hsl',
  'hsla',
];

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

      describe(`rgbHex()`, () => {
        it('should return a random rgb hex color', () => {
          const color = faker.color.rgbHex();
          expect(color).match(/^(0x[a-fA-F0-9]{6})$/);
        });
      });

      describe(`rgbNumeric()`, () => {
        it('should return a random rgb color in decimal format', () => {
          const color = faker.color.rgbNumeric();
          expect(color).length(3);
          color.forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(255);
          });
        });
      });

      describe(`rgbaHex()`, () => {
        it('should return a random rgba hex color', () => {
          const color = faker.color.rgbaHex();
          expect(color).match(/^(0x[a-fA-F0-9]{8})$/);
        });
      });

      describe(`rgbaNumeric()`, () => {
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

      describe(`cmyk()`, () => {
        it('should return a random cmyk color', () => {
          const color = faker.color.cmyk();
          expect(color).length(4);
          color.forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(1);
          });
        });
      });

      describe(`hsl()`, () => {
        it('should return a random hsl color in decimal format', () => {
          const color = faker.color.hsl();
          expect(color).length(3);
          expect(color[0]).toBeGreaterThanOrEqual(0);
          expect(color[0]).toBeLessThanOrEqual(360);
          color.slice(1).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(1);
          });
        });
      });

      describe(`hsla()`, () => {
        it('should return a random hsla color in decimal format', () => {
          const color = faker.color.hsla();
          expect(color).length(4);
          expect(color[0]).toBeGreaterThanOrEqual(0);
          expect(color[0]).toBeLessThanOrEqual(360);
          color.slice(1).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(1);
          });
        });
      });
    }
  });
});
