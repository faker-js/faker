import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 25;

describe('computer', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'computer', (t) => {
    t.itEach(
      'computerBrand',
      'computerModel',
      'computerOs',
      'computerColor',
      'computerCPU',
      'computerGraphicCard',
      'computerProductDimensions',
      'computerMemoryStorageCapacity',
      'computerRam',
      'computerScreenSize'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('computerBrand()', () => {
        it('should return a random brand', () => {
          const computerBrand = faker.computer.computerBrand();

          expect(computerBrand).toBeTruthy();
          expect(computerBrand).toBeTypeOf('string');
          expect(faker.definitions.computer?.brand).toContain(computerBrand);
        });
      });

      describe('computerModel()', () => {
        it('should return a random model', () => {
          const computerModel = faker.computer.computerModel();

          expect(computerModel).toBeTruthy();
          expect(computerModel).toBeTypeOf('string');
          expect(faker.definitions.computer?.model).toContain(computerModel);
        });
      });

      describe('computerColor()', () => {
        it('should return a random color', () => {
          const color = faker.computer.computerColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });

      describe('computerOs()', () => {
        it('should return a random os', () => {
          const computerOs = faker.computer.computerOs();

          expect(computerOs).toBeTruthy();
          expect(computerOs).toBeTypeOf('string');
          expect(faker.definitions.computer?.os).toContain(computerOs);
        });
      });

      describe('computerCPU()', () => {
        it('should return a random cpu', () => {
          const computerCPU = faker.computer.computerCPU();

          expect(computerCPU).toBeTruthy();
          expect(computerCPU).toBeTypeOf('string');
          expect(faker.definitions.computer?.cpu).toContain(computerCPU);
        });
      });

      describe('computerGraphicCard()', () => {
        it('should return a random graphic card', () => {
          const computerGraphicCard = faker.computer.computerGraphicCard();

          expect(computerGraphicCard).toBeTruthy();
          expect(computerGraphicCard).toBeTypeOf('string');
          expect(faker.definitions.computer?.graphicCard).toContain(
            computerGraphicCard
          );
        });
      });

      describe('computerProductDimensions()', () => {
        it('should return a random product dimensions', () => {
          const computerProductDimensions =
            faker.computer.computerProductDimensions();

          expect(computerProductDimensions).toBeTruthy();
          expect(computerProductDimensions).toBeTypeOf('string');
          expect(faker.definitions.computer?.productDimensions).toContain(
            computerProductDimensions
          );
        });
      });

      describe('computerMemoryStorageCapacity()', () => {
        it('should return a random memory storage capacity', () => {
          const computerMemoryStorageCapacity =
            faker.computer.computerMemoryStorageCapacity();

          expect(computerMemoryStorageCapacity).toBeTruthy();
          expect(computerMemoryStorageCapacity).toBeTypeOf('string');
          expect(faker.definitions.computer?.memoryStorageCapacity).toContain(
            computerMemoryStorageCapacity
          );
        });
      });

      describe('computerRam()', () => {
        it('should return a random ram', () => {
          const computerRam = faker.computer.computerRam();

          expect(computerRam).toBeTruthy();
          expect(computerRam).toBeTypeOf('string');
          expect(faker.definitions.computer?.ram).toContain(computerRam);
        });
      });

      describe('computerScreenSize()', () => {
        it('should return a random screen size', () => {
          const computerScreenSize = faker.computer.computerScreenSize();

          expect(computerScreenSize).toBeTruthy();
          expect(computerScreenSize).toBeTypeOf('string');
          expect(faker.definitions.computer?.screenSize).toContain(
            computerScreenSize
          );
        });
      });
    }
  });
});
