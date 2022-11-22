import type { Faker } from '../..';

/**
 * Module to generate vehicle related entries.
 */
export class VehicleModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(VehicleModule.prototype)) {
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
   *
   * @since 5.0.0
   */
  vehicle(): string {
    return `${this.manufacturer()} ${this.model()}`;
  }

  /**
   * Returns a manufacturer name.
   *
   * @example
   * faker.vehicle.manufacturer() // 'Ford'
   *
   * @since 5.0.0
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
   *
   * @since 5.0.0
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
   *
   * @since 5.0.0
   */
  type(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.vehicle.type);
  }

  /**
   * Returns a fuel type.
   *
   * @example
   * faker.vehicle.fuel() // 'Electric'
   *
   * @since 5.0.0
   */
  fuel(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.vehicle.fuel);
  }

  /**
   * Returns a vehicle identification number (VIN).
   *
   * @example
   * faker.vehicle.vin() // 'YV1MH682762184654'
   *
   * @since 5.0.0
   */
  vin(): string {
    const exclude = ['o', 'i', 'q', 'O', 'I', 'Q'];
    return `${this.faker.string.alphanumeric({
      length: 10,
      casing: 'upper',
      exclude,
    })}${this.faker.string.alpha({
      length: 1,
      casing: 'upper',
      exclude,
    })}${this.faker.string.alphanumeric({
      length: 1,
      casing: 'upper',
      exclude,
    })}${this.faker.number.int({ min: 10000, max: 99999 })}` // return five digit #
      .toUpperCase();
  }

  /**
   * Returns a vehicle color.
   *
   * @example
   * faker.vehicle.color() // 'red'
   *
   * @since 5.0.0
   */
  color(): string {
    return this.faker.color.human();
  }

  /**
   * Returns a vehicle registration number (Vehicle Registration Mark - VRM)
   *
   * @example
   * faker.vehicle.vrm() // 'MF56UPA'
   *
   * @since 5.4.0
   */
  vrm(): string {
    return `${this.faker.string.alpha({
      length: 2,
      casing: 'upper',
    })}${this.faker.number.int({
      min: 0,
      max: 9,
    })}${this.faker.number.int({
      min: 0,
      max: 9,
    })}${this.faker.string.alpha({
      length: 3,
      casing: 'upper',
    })}`;
  }

  /**
   * Returns a type of bicycle.
   *
   * @example
   * faker.vehicle.bicycle() // 'Adventure Road Bicycle'
   *
   * @since 5.5.0
   */
  bicycle(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.vehicle.bicycle_type
    );
  }
}
