import type { Faker } from '../..';

/**
 * Module to generate vehicle related entries.
 */
export class Vehicle {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Vehicle.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random vehicle.
   *
   * @example
   * faker.vehicle.vehicle() // 'BMW Explorer'
   */
  vehicle(): string {
    return `${this.manufacturer()} ${this.model()}`;
  }

  /**
   * Returns a manufacturer name.
   *
   * @example
   * faker.vehicle.manufacturer() // 'Ford'
   */
  manufacturer(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.vehicle.manufacturer
    );
  }

  /**
   * Returns a vehicle model.
   *
   * @example
   * faker.vehicle.model() // 'Explorer'
   */
  model(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.vehicle.model
    );
  }

  /**
   * Returns a vehicle type.
   *
   * @example
   * faker.vehicle.type() // 'Coupe'
   */
  type(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.vehicle.type);
  }

  /**
   * Returns a fuel type.
   *
   * @example
   * faker.vehicle.fuel() // 'Electric'
   */
  fuel(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.vehicle.fuel);
  }

  /**
   * Returns a vehicle identification number (VIN).
   *
   * @example
   * faker.vehicle.vin() // 'YV1MH682762184654'
   */
  vin(): string {
    const bannedChars = ['o', 'i', 'q', 'O', 'I', 'Q'];
    return `${this.faker.random.alphaNumeric(10, {
      casing: 'upper',
      bannedChars,
    })}${this.faker.random.alpha({
      count: 1,
      casing: 'upper',
      bannedChars,
    })}${this.faker.random.alphaNumeric(1, {
      casing: 'upper',
      bannedChars,
    })}${this.faker.datatype.number({ min: 10000, max: 99999 })}` // return five digit #
      .toUpperCase();
  }

  /**
   * Returns a vehicle color.
   *
   * @example
   * faker.vehicle.color() // 'red'
   */
  color(): string {
    return this.faker.color.human();
  }

  /**
   * Returns a vehicle registration number (Vehicle Registration Mark - VRM)
   *
   * @example
   * faker.vehicle.vrm() // 'MF56UPA'
   */
  vrm(): string {
    return `${this.faker.random.alpha({
      count: 2,
      casing: 'upper',
    })}${this.faker.datatype.number({
      min: 0,
      max: 9,
    })}${this.faker.datatype.number({
      min: 0,
      max: 9,
    })}${this.faker.random.alpha({ count: 3, casing: 'upper' })}`.toUpperCase();
  }

  /**
   * Returns a type of bicycle.
   *
   * @example
   * faker.vehicle.bicycle() // 'Adventure Road Bicycle'
   */
  bicycle(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.vehicle.bicycle_type
    );
  }
}
