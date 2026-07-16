import { describe, expect, it } from 'vitest';
import { faker } from '../../src';
import { seededTests } from '../support/seeded-runs';
import { times } from '../support/times';

const NON_SEEDED_BASED_RUN = 5;

const vinWeights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

const vinTransliteration: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  P: 7,
  R: 9,
  S: 2,
  T: 3,
  U: 4,
  V: 5,
  W: 6,
  X: 7,
  Y: 8,
  Z: 9,
};

function calculateVinCheckDigit(vin: string): string {
  let checksum = 0;
  for (const [index, character] of vin.split('').entries()) {
    const value = vinTransliteration[character] ?? Number(character);
    checksum += value * vinWeights[index];
  }

  return checksum % 11 === 10 ? 'X' : String(checksum % 11);
}

describe('vehicle', () => {
  seededTests(faker, 'vehicle', (t) => {
    t.itEach(
      'vehicle',
      'manufacturer',
      'model',
      'type',
      'fuel',
      'vin',
      'color',
      'vrm',
      'bicycle'
    );
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('vehicle()', () => {
        it('should return a random vehicle', () => {
          const vehicle = faker.vehicle.vehicle();

          expect(vehicle).toBeTruthy();
          expect(vehicle).toBeTypeOf('string');
          expect(vehicle.split(' ').length).toBeGreaterThanOrEqual(2);
        });
      });

      describe('manufacturer()', () => {
        it('should return random manufacturer', () => {
          const manufacturer = faker.vehicle.manufacturer();

          expect(manufacturer).toBeTruthy();
          expect(manufacturer).toBeTypeOf('string');
          expect(faker.definitions.vehicle.manufacturer).toContain(
            manufacturer
          );
        });
      });

      describe('model()', () => {
        it('should return random vehicle model', () => {
          const model = faker.vehicle.model();

          expect(model).toBeTruthy();
          expect(model).toBeTypeOf('string');
          expect(faker.definitions.vehicle.model).toContain(model);
        });
      });

      describe('type()', () => {
        it('should return random vehicle type', () => {
          const type = faker.vehicle.type();

          expect(type).toBeTruthy();
          expect(type).toBeTypeOf('string');
          expect(faker.definitions.vehicle.type).toContain(type);
        });
      });

      describe('fuel()', () => {
        it('should return a fuel type', () => {
          const fuel = faker.vehicle.fuel();

          expect(fuel).toBeTruthy();
          expect(fuel).toBeTypeOf('string');
          expect(faker.definitions.vehicle.fuel).toContain(fuel);
        });
      });

      describe('color()', () => {
        it('should return a random color', () => {
          const color = faker.vehicle.color();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
          expect(faker.definitions.color.human).toContain(color);
        });
      });

      describe('vin()', () => {
        it('returns valid vin number', () => {
          const vin = faker.vehicle.vin();
          expect(vin).toMatch(
            /^([A-HJ-NPR-Z0-9]{10}[A-HJ-NPR-Z0-9]{1}[A-HJ-NPR-Z0-9]{1}\d{5})$/
          );
        });

        it('should return valid vin number', () => {
          const vin = faker.vehicle.vin();

          expect(vin).toBeTruthy();
          expect(vin).toBeTypeOf('string');
          expect(vin).toMatch(
            /^([A-HJ-NPR-Z0-9]{10}[A-HJ-NPR-Z0-9]{1}[A-HJ-NPR-Z0-9]{1}\d{5})$/
          );
        });

        it('should return a VIN with a valid check digit', () => {
          expect(calculateVinCheckDigit('1M8GDM9AXKP042788')).toBe('X');

          for (let index = 0; index < 100; index++) {
            const vin = faker.vehicle.vin();
            expect(vin[8]).toBe(calculateVinCheckDigit(vin));
          }
        });
      });

      describe('vrm()', () => {
        it('should return a random vrm', () => {
          const vrm = faker.vehicle.vrm();

          expect(vrm).toBeTruthy();
          expect(vrm).toBeTypeOf('string');
          expect(vrm).toMatch(/^[A-Z]{2}[0-9]{2}[A-Z]{3}$/);
        });
      });

      describe('bicycle()', () => {
        it('should return a random type of bicycle', () => {
          const bicycle = faker.vehicle.bicycle();

          expect(bicycle).toBeTruthy();
          expect(bicycle).toBeTypeOf('string');
          expect(faker.definitions.vehicle.bicycle_type).toContain(bicycle);
        });
      });
    }
  );
});
