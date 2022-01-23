import type { Faker } from '.';
import type { Fake } from './fake';

let fake: Fake['fake'];

export class Vehicle {
  constructor(private readonly faker: Faker) {
    fake = faker.fake;

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
   */
  vehicle(): string {
    return fake('{{vehicle.manufacturer}} {{vehicle.model}}');
  }

  /**
   * Returns a manufacturer name.
   */
  manufacturer(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.vehicle.manufacturer
    );
  }

  /**
   * Returns a vehicle model.
   */
  model(): string {
    return this.faker.random.arrayElement(this.faker.definitions.vehicle.model);
  }

  /**
   * Returns a vehicle type.
   */
  type(): string {
    return this.faker.random.arrayElement(this.faker.definitions.vehicle.type);
  }

  /**
   * Returns a fuel type.
   */
  fuel(): string {
    return this.faker.random.arrayElement(this.faker.definitions.vehicle.fuel);
  }

  /**
   * Returns a valid VIN number.
   */
  vin(): string {
    const bannedChars = ['o', 'i', 'q'];
    return (
      this.faker.random.alphaNumeric(10, { bannedChars: bannedChars }) +
      this.faker.random.alpha({
        count: 1,
        upcase: true,
        bannedChars: bannedChars,
      }) +
      this.faker.random.alphaNumeric(1, { bannedChars: bannedChars }) +
      this.faker.datatype.number({ min: 10000, max: 100000 })
    ) // return five digit #
      .toUpperCase();
  }

  /**
   * Returns a vehicle color.
   */
  color(): string {
    return fake('{{commerce.color}}');
  }

  /**
   * Returns a vehicle vrm.
   */
  vrm(): string {
    return (
      this.faker.random.alpha({ count: 2, upcase: true }) +
      this.faker.datatype.number({ min: 0, max: 9 }) +
      this.faker.datatype.number({ min: 0, max: 9 }) +
      this.faker.random.alpha({ count: 3, upcase: true })
    ).toUpperCase();
  }

  /**
   * Returns a type of bicycle.
   */
  bicycle(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.vehicle.bicycle_type
    );
  }
}
