import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      vehicle: 'Ford Golf',
      manufacturer: 'Ford',
      model: 'Escalade',
      type: 'Extended Cab Pickup',
      fuel: 'Electric',
      vin: 'CTY6RSKK5ED315227',
      color: 'grey',
      vrm: 'JU91TUP',
      bicycle: 'Fitness Bicycle',
    },
  },
  {
    seed: 1337,
    expectations: {
      vehicle: 'Dodge Model S',
      manufacturer: 'Dodge',
      model: 'Colorado',
      type: 'Coupe',
      fuel: 'Electric',
      vin: '8J579HF1A7MK33574',
      color: 'black',
      vrm: 'GO12HOL',
      bicycle: 'Cyclocross Bicycle',
    },
  },
  {
    seed: 1211,
    expectations: {
      vehicle: 'Toyota Challenger',
      manufacturer: 'Toyota',
      model: '2',
      type: 'Wagon',
      fuel: 'Hybrid',
      vin: 'XFWS74Z1N5S678767',
      color: 'azure',
      vrm: 'YL87FDZ',
      bicycle: 'Triathlon/Time Trial Bicycle',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'vehicle',
  'manufacturer',
  'model',
  'type',
  'fuel',
  'vin',
  'color',
  'vrm',
  'bicycle',
];

describe('vehicle', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.vehicle[functionName]();
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

      describe('vin()', () => {
        it('returns valid vin number', () => {
          const vin = faker.vehicle.vin();
          expect(vin).toMatch(
            /^([A-HJ-NPR-Z0-9]{10}[A-HJ-NPR-Z0-9]{1}[A-HJ-NPR-Z0-9]{1}\d{5})$/
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

      describe('vin()', () => {
        it('should return valid vin number', () => {
          const vin = faker.vehicle.vin();

          expect(vin).toBeTruthy();
          expect(vin).toBeTypeOf('string');
          expect(vin).toMatch(
            /^([A-HJ-NPR-Z0-9]{10}[A-HJ-NPR-Z0-9]{1}[A-HJ-NPR-Z0-9]{1}\d{5})$/
          );
        });
      });

      describe('color()', () => {
        it('should return a random color', () => {
          const color = faker.vehicle.color();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
          expect(faker.definitions.commerce.color).toContain(color);
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
  });
});
