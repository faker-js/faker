import { expect } from 'vitest';
import { describe, it, vi } from 'vitest';
import { faker } from '../lib/cjs';

describe('vehicle', () => {
  describe('vehicle()', () => {
    it('returns a random vehicle', () => {
      const spy_vehicle_vehicle = vi
        .spyOn(faker.vehicle, 'vehicle')
        .mockReturnValue('Ford Explorer');
      const vehicle = faker.vehicle.vehicle();

      expect(vehicle).toBe('Ford Explorer');
      spy_vehicle_vehicle.mockRestore();
    });
  });

  describe('manufacturer()', () => {
    it('returns random manufacturer', () => {
      const spy_vehicle_manufacturer = vi
        .spyOn(faker.vehicle, 'manufacturer')
        .mockReturnValue('Porsche');
      const manufacturer = faker.vehicle.manufacturer();

      expect(manufacturer).toBe('Porsche');
      spy_vehicle_manufacturer.mockRestore();
    });
  });

  describe('type()', () => {
    it('returns random vehicle type', () => {
      const spy_vehicle_type = vi
        .spyOn(faker.vehicle, 'type')
        .mockReturnValue('Minivan');
      const type = faker.vehicle.type();

      expect(type).toBe('Minivan');
      spy_vehicle_type.mockRestore();
    });
  });

  describe('fuel()', () => {
    it('returns a fuel type', () => {
      const spy_vehicle_fuel = vi
        .spyOn(faker.vehicle, 'fuel')
        .mockReturnValue('Hybrid');
      const fuel = faker.vehicle.fuel();

      expect(fuel).toBe('Hybrid');
      spy_vehicle_fuel.mockRestore();
    });
  });

  describe('vin()', () => {
    it('returns valid vin number', () => {
      const vin = faker.vehicle.vin();
      expect(vin).match(
        /^([A-HJ-NPR-Z0-9]{10}[A-HJ-NPR-Z0-9]{1}[A-HJ-NPR-Z0-9]{1}\d{5})$/
      );
    });
  });

  describe('color()', () => {
    it('returns a random color', () => {
      const spy_vehicle_color = vi
        .spyOn(faker.vehicle, 'color')
        .mockReturnValue('black');
      const color = faker.vehicle.color();

      expect(color).toBe('black');
      spy_vehicle_color.mockRestore();
    });
  });

  describe('vrm()', () => {
    it('returns a random vrm', () => {
      const spy_vehicle_vrm = vi
        .spyOn(faker.vehicle, 'vrm')
        .mockReturnValue('MF59EEW');
      const vrm = faker.vehicle.vrm();

      expect(vrm).toBe('MF59EEW');
      spy_vehicle_vrm.mockRestore();
    });
  });

  describe('bicycle()', () => {
    it('returns a random type of bicycle', () => {
      const spy_vehicle_bicycle = vi
        .spyOn(faker.vehicle, 'bicycle')
        .mockReturnValue('Adventure Road Bicycle');
      const bicycle = faker.vehicle.bicycle();

      expect(bicycle).toBe('Adventure Road Bicycle');
      spy_vehicle_bicycle.mockRestore();
    });
  });
});
