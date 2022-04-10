import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      human: 'grey',
      space: 'Rec. 709',
      gamut: 'hsla',
      rgb: '0x8BE4AB',
      hsl: [135, 0.8, 0.96],
      hwb: [135, 0.8, 0.96],
      cmyk: [0.37, 0.8, 0.96, 0.18],
      lab: [0.37454, 59.3086, 90.1429],
      lch: [0.37454, 183.2, 218.7],
      displayP3: [0.37, 0.8, 0.96],
    },
  },
  {
    seed: 1337,
    expectations: {
      human: 'black',
      space: 'ProPhoto RGB Color Space',
      gamut: 'hsl',
      rgb: '0x5c346b',
      hsl: [94, 0.56, 0.16],
      hwb: [94, 0.56, 0.16],
      cmyk: [0.26, 0.56, 0.16, 0.21],
      lab: [0.262024, 12.106, -68.2632],
      lch: [0.262024, 128.9, 36.5],
      displayP3: [0.26, 0.56, 0.16],
    },
  },
  {
    seed: 1211,
    expectations: {
      human: 'azure',
      space: 'LMS',
      gamut: 'display-p3',
      rgb: '0xEaDB42',
      hsl: [335, 0.46, 0.9],
      hwb: [335, 0.46, 0.9],
      cmyk: [0.93, 0.46, 0.9, 0.78],
      lab: [0.928521, -8.197, 78.6944],
      lch: [0.928521, 105.6, 205.5],
      displayP3: [0.93, 0.46, 0.9],
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'human',
  'space',
  'gamut',
  'rgb',
  'hsl',
  'hwb',
  'cmyk',
  'lab',
  'lch',
  'displayP3',
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

      describe(`space()`, () => {
        it('should return random color space from color space array', () => {
          const space = faker.color.space();
          expect(faker.definitions.color.space).toContain(space);
        });
      });

      describe(`gamut()`, () => {
        it('should return random color gamut from color gamut array', () => {
          const gamut = faker.color.gamut();
          expect(faker.definitions.color.gamut).toContain(gamut);
        });
      });

      describe(`rgb()`, () => {
        it('should return a random rgb hex color', () => {
          const color = faker.color.rgb();
          expect(color).match(/^(0x[a-fA-F0-9]{6})$/);
        });
      });

      describe(`rgb({ prefix: '#' })`, () => {
        it('should return a random rgb hex color with # prefix', () => {
          const color = faker.color.rgb({ prefix: '#' });
          expect(color).match(/^(#[a-fA-F0-9]{6})$/);
        });
      });

      describe(`rgbHex({ prefix: '#', case: 'lower' })`, () => {
        it('should return a random rgb hex color with # prefix and lower case only', () => {
          const color = faker.color.rgb({ prefix: '#', case: 'lower' });
          expect(color).match(/^(#[a-f0-9]{6})$/);
        });
      });

      describe(`rgb({ prefix: '#', case: 'upper' })`, () => {
        it('should return a random rgb hex color with # prefix and upper case only', () => {
          const color = faker.color.rgb({ prefix: '#', case: 'upper' });
          expect(color).match(/^(#[A-F0-9]{6})$/);
        });
      });

      describe(`rgb({ format: 'decimal' })`, () => {
        it('should return a random rgb color in decimal format', () => {
          const color = faker.color.rgb({ format: 'decimal' });
          expect(color).length(3);
          (color as number[]).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(255);
          });
        });
      });

      describe(`rgb({ format: 'css' })`, () => {
        it('should return a random rgb color in css format', () => {
          const color = faker.color.rgb({ format: 'css' });
          expect(color).match(/^(rgb\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}\))$/);
        });
      });

      describe(`rgb({ format: 'binary' })`, () => {
        it('should return a random rgb color in binary format', () => {
          const color = faker.color.rgb({ format: 'binary' });
          expect(color).match(/^([01]{8} [01]{8} [01]{8})$/);
        });
      });

      describe(`rgb({ includeAlpha: true })`, () => {
        it('should return a random rgb color in hex format with alpha value', () => {
          const color = faker.color.rgb({ includeAlpha: true });
          expect(color).match(/^(0x[a-fA-F0-9]{8})$/);
        });
      });

      describe(`rgb({ format: 'decimal', includeAlpha: true })`, () => {
        it('should return a random rgb color in hex format with alpha value', () => {
          const color = faker.color.rgb({
            format: 'decimal',
            includeAlpha: true,
          });
          expect(color[color.length - 1]).toBeGreaterThanOrEqual(0);
          expect(color[color.length - 1]).toBeLessThanOrEqual(1);
          (color.slice(0, 4) as number[]).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(255);
          });
        });
      });

      describe(`rgb({ format: 'binary', includeAlpha: true })`, () => {
        it('should return a random rgb color in binary format with alpha value', () => {
          const color = faker.color.rgb({
            format: 'binary',
            includeAlpha: true,
          });
          expect(color).match(/^([01]{8} [01]{8} [01]{8} [01]{8,32})$/);
        });
      });

      describe(`rgb({ format: 'css', includeAlpha: true })`, () => {
        it('should return a random rgb color in css format with alpha value', () => {
          const color = faker.color.rgb({ format: 'css', includeAlpha: true });
          expect(color).match(
            /^(rgba\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}, \d*\.?\d*\))$/
          );
        });
      });

      describe(`cmyk()`, () => {
        it('should return a random cmyk color', () => {
          const color = faker.color.cmyk();
          expect(color).length(4);
          (color as number[]).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(1);
          });
        });
      });

      describe(`cmyk({ format: 'decimal' })`, () => {
        it('should return a random cmyk color in decimal format', () => {
          const color = faker.color.cmyk({ format: 'decimal' });
          expect(color).length(4);
          (color as number[]).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(1);
          });
        });
      });

      describe(`cmyk({ format: 'css' })`, () => {
        it('should return a random cmyk color in css format', () => {
          const color = faker.color.cmyk({ format: 'css' });
          expect(color).match(
            /^(cmyk\([0-9]{1,3}%, [0-9]{1,3}%, [0-9]{1,3}%, [0-9]{1,3}%\))$/
          );
        });
      });

      describe(`cmyk({ format: 'binary' })`, () => {
        it('should return a random cmyk color in binary format', () => {
          const color = faker.color.cmyk({ format: 'binary' });
          expect(color).match(
            /^([01]{8,32} [01]{8,32} [01]{8,32} [01]{8,32})$/
          );
        });
      });

      describe(`hsl()`, () => {
        it('should return a random hsl color in decimal format', () => {
          const color = faker.color.hsl();
          expect(color).length(3);
          expect(color[0]).toBeGreaterThanOrEqual(0);
          expect(color[0]).toBeLessThanOrEqual(360);
          (color.slice(1) as number[]).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(1);
          });
        });
      });

      describe(`hsl({ format: 'css' })`, () => {
        it('should return a random hsl color in css format', () => {
          const color = faker.color.hsl({ format: 'css' });
          expect(color).match(
            /^(hsl\([0-9]{1,3}deg [0-9]{1,3}% [0-9]{1,3}%\))$/
          );
        });
      });

      describe(`hsl({ format: 'css', includeAlpha: true })`, () => {
        it('should return a random hsl color in css format with an alpha value', () => {
          const color = faker.color.hsl({ format: 'css', includeAlpha: true });
          expect(color).match(
            /^(hsl\([0-9]{1,3}deg [0-9]{1,3}% [0-9]{1,3}% \/ \d*\.?\d*\))$/
          );
        });
      });

      describe(`hsl({ format: 'binary' })`, () => {
        it('should return a random hsl color in binary format', () => {
          const color = faker.color.hsl({ format: 'binary' });
          expect(color).match(/^([01]{8,32} [01]{8,32} [01]{8,32})$/);
        });
      });

      describe(`hsl({ format: 'binary', includeAlpha: true })`, () => {
        it('should return a random hsl color in binary format with an alpha value', () => {
          const color = faker.color.hsl({
            format: 'binary',
            includeAlpha: true,
          });
          expect(color).match(
            /^([01]{8,32} [01]{8,32} [01]{8,32} [01]{8,32})$/
          );
        });
      });

      describe(`hwb()`, () => {
        it('should return a random hwb color in decimal format', () => {
          const color = faker.color.hwb();
          expect(color).length(3);
          expect(color[0]).toBeGreaterThanOrEqual(0);
          expect(color[0]).toBeLessThanOrEqual(360);
          (color.slice(1) as number[]).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(1);
          });
        });
      });

      describe(`hwb({ format: 'decimal' })`, () => {
        it('should return a random hwb color in decimal format', () => {
          const color = faker.color.hwb();
          expect(color).length(3);
          expect(color[0]).toBeGreaterThanOrEqual(0);
          expect(color[0]).toBeLessThanOrEqual(360);
          (color.slice(1) as number[]).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(1);
          });
        });
      });

      describe(`hwb({ format: 'css' })`, () => {
        it('should return a random hwb color in css format', () => {
          const color = faker.color.hwb({ format: 'css' });
          expect(color).match(/^(hwb\([0-9]{1,3} [0-9]{1,3}% [0-9]{1,3}%\))$/);
        });
      });

      describe(`hwb({ format: 'binary' })`, () => {
        it('should return a random hwb color in binary format', () => {
          const color = faker.color.hwb({ format: 'binary' });
          expect(color).match(/^([01]{8,32} [01]{8,32} [01]{8,32})$/);
        });
      });

      describe(`lab()`, () => {
        it('should return a random lab color in decimal format', () => {
          const color = faker.color.lab();
          expect(color).length(3);
          expect(color[0]).toBeGreaterThanOrEqual(0);
          expect(color[0]).toBeLessThanOrEqual(1);
          (color.slice(1) as number[]).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(-100);
            expect(value).toBeLessThanOrEqual(100);
          });
        });
      });

      describe(`lab({ format: 'decimal' })`, () => {
        it('should return a random lab color in decimal format', () => {
          const color = faker.color.lab({ format: 'decimal' });
          expect(color).length(3);
          expect(color[0]).toBeGreaterThanOrEqual(0);
          expect(color[0]).toBeLessThanOrEqual(1);
          (color.slice(1) as number[]).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(-100);
            expect(value).toBeLessThanOrEqual(100);
          });
        });
      });

      describe(`lab({ format: 'css' })`, () => {
        it('should return a random lab color in css format', () => {
          const color = faker.color.lab({ format: 'css' });
          expect(color).match(
            /^(lab\((\d*\.?\d*|[0-9]{1,3})% -?\d*\.?\d* -?\d*\.?\d*\))$/
          );
        });
      });

      describe(`lab({ format: 'binary' })`, () => {
        it('should return a random lab color in binary format', () => {
          const color = faker.color.lab({ format: 'binary' });
          expect(color).match(/^([01]{8,32} [01]{8,32} [01]{8,32})$/);
        });
      });

      describe(`lch()`, () => {
        it('should return a random lch color in decimal format', () => {
          const color = faker.color.lch();
          expect(color).length(3);
          expect(color[0]).toBeGreaterThanOrEqual(0);
          expect(color[0]).toBeLessThanOrEqual(1);
          (color.slice(1) as number[]).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(230);
          });
        });
      });

      describe(`lch({ format: 'decimal' })`, () => {
        it('should return a random lch color in decimal format', () => {
          const color = faker.color.lch({ format: 'decimal' });
          expect(color).length(3);
          expect(color[0]).toBeGreaterThanOrEqual(0);
          expect(color[0]).toBeLessThanOrEqual(1);
          (color.slice(1) as number[]).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(230);
          });
        });
      });

      describe(`lch({ format: 'css' })`, () => {
        it('should return a random lch color in css format', () => {
          const color = faker.color.lch({ format: 'css' });
          expect(color).match(
            /^(lch\((\d*\.?\d*|[0-9]{1,3})% \d*\.?\d* \d*\.?\d*\))$/
          );
        });
      });

      describe(`lch({ format: 'binary' })`, () => {
        it('should return a random lch color in binary format', () => {
          const color = faker.color.lch({ format: 'binary' });
          expect(color).match(/^([01]{8,32} [01]{8,32} [01]{8,32})$/);
        });
      });

      describe(`displayP3()`, () => {
        it('should return a random display-p3 color in decimal format', () => {
          const color = faker.color.displayP3();
          expect(color).length(3);
          (color as number[]).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(1);
          });
        });
      });

      describe(`displayP3({ format: 'decimal' })`, () => {
        it('should return a random displayP3 color in decimal format', () => {
          const color = faker.color.displayP3({ format: 'decimal' });
          expect(color).length(3);
          (color as number[]).forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(1);
          });
        });
      });

      describe(`displayP3({ format: 'css' })`, () => {
        it('should return a random displayP3 color in css format', () => {
          const color = faker.color.displayP3({ format: 'css' });
          expect(color).match(
            /^color\(display-p3 \d*\.?\d* \d*\.?\d* \d*\.?\d*\)$/
          );
        });
      });

      describe(`displayP3({ format: 'binary' })`, () => {
        it('should return a random displayP3 color in binary format', () => {
          const color = faker.color.displayP3({ format: 'binary' });
          expect(color).match(/^([01]{8,32} [01]{8,32} [01]{8,32})$/);
        });
      });
    }
  });
});
