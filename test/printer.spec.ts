import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('printer', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'printer', (t) => {
    t.itEach(
      'printerBrand',
      'printerName',
      'printerType',
      'printerFunctions',
      'printerColorOutput',
      'printerUse',
      'printerConnectivity',
      'printerPaperSize',
      'printerFeatures'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.printer.printerBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.printer?.brand).toContain(brand);
        });
      });

      describe('name()', () => {
        it('should return a brand', () => {
          const name = faker.printer.printerName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.printer?.name).toContain(name);
        });
      });

      describe('type()', () => {
        it('returns a random type', () => {
          const type = faker.printer.printerType();

          expect(type).toBeTruthy();
          expect(type).toBeTypeOf('string');
          expect(faker.definitions.printer?.type).toContain(type);
        });
      });

      describe('functions()', () => {
        it('returns a random functions', () => {
          const functions = faker.printer.printerFunctions();

          expect(functions).toBeTruthy();
          expect(functions).toBeTypeOf('string');
          expect(faker.definitions.printer?.functions).toContain(functions);
        });
      });

      describe('colorOutput()', () => {
        it('returns a random colorOutput', () => {
          const colorOutput = faker.printer.printerColorOutput();

          expect(colorOutput).toBeTruthy();
          expect(colorOutput).toBeTypeOf('string');
          expect(faker.definitions.printer?.colorOutput).toContain(colorOutput);
        });
      });

      describe('use()', () => {
        it('returns a random use', () => {
          const use = faker.printer.printerUse();

          expect(use).toBeTruthy();
          expect(use).toBeTypeOf('string');
          expect(faker.definitions.printer?.use).toContain(use);
        });
      });

      describe('connectivity()', () => {
        it('returns a random connectivity', () => {
          const connectivity = faker.printer.printerConnectivity();

          expect(connectivity).toBeTruthy();
          expect(connectivity).toBeTypeOf('string');
          expect(faker.definitions.printer?.connectivity).toContain(
            connectivity
          );
        });
      });
    }
  });
});
