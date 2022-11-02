import type { Faker } from '../..';

/**
 * Module to generate flight related entries.
 */
export class FlightsModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(FlightsModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random flight departure.
   *
   * @example
   * faker.flights.flightDeparture() // 'Venice'
   *
   * @since 8.0.0
   */
  flightDeparture(): string {
    return this.faker.location.city();
  }

  /**
   * Returns a random flight destination.
   *
   * @example
   * faker.flights.flightDestination() // 'Milan'
   *
   * @since 8.0.0
   */
  flightDestination(): string {
    return this.faker.location.city();
  }

  /**
   * Returns a random departure date.
   *
   * @example
   * faker.flights.flightDepartureDate() // '2020-09-12T07:13:00.255Z'
   *
   * @since 8.0.0
   */
  flightDepartureDate(): Date {
    return this.faker.datatype.datetime({
      min: 1577836800000,
      max: 1638936800000,
    });
  }

  /**
   * Returns a random return date.
   *
   * @example
   * faker.flights.flightReturnDate() // '2022-09-12T07:13:00.255Z'
   *
   * @since 8.0.0
   */
  flightReturnDate(): Date {
    return this.faker.datatype.datetime({
      min: 1638936800001,
      max: 1658936800000,
    });
  }

  /**
   * Returns a random number of adults.
   *
   * @example
   * faker.flights.flightAdults() // '5'
   *
   * @since 8.0.0
   */
  flightAdults(): number {
    return this.faker.datatype.number({ min: 1, max: 10 });
  }

  /**
   * Returns a random number of children.
   *
   * @example
   * faker.flights.flightChildren() // '5'
   *
   * @since 8.0.0
   */
  flightChildren(): number {
    return this.faker.datatype.number({ min: 1, max: 10 });
  }

  /**
   * Returns a random flight airline.
   *
   * @example
   * faker.flights.flightAirline() // 'Ryanair'
   *
   * @since 8.0.0
   */
  flightAirline(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.flights.airline
    );
  }

  /**
   * Returns a random flight property type.
   *
   * @example
   * faker.flights.flightType() // 'Direct'
   *
   * @since 8.0.0
   */
  flightType(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.flights.type);
  }

  /**
   * Returns a random flight class.
   *
   * @example
   * faker.flights.flightClass() // 'Economy'
   *
   * @since 8.0.0
   */
  flightClass(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.flights.class_
    );
  }

  /**
   * Returns a random flight number.
   *
   * @example
   * faker.flights.flightNumber() // 'FR 2520'
   *
   * @since 8.0.0
   */
  flightNumber(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.flights.number
    );
  }
}
